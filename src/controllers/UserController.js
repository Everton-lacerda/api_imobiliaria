const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerSchema } = require('../validations/userValidation');
const transporter = require('../config/emailConfig');
const User = require('../models/User');

const UserController = {
  /**
   * Obtém a lista de usuários com base nos parâmetros de consulta.
   *
   * @route GET /api/users
   * @param {number} [page=1] - Opcional. Número da página a ser retornada. Padrão: 1.
   * @param {number} [limit=10] - Opcional. Limite de usuários por página. Padrão: 10.
   * @param {string} [sortField='createdAt'] - Opcional. Campo pelo qual os usuários devem ser ordenados. Padrão: 'createdAt'.
   * @param {string} [sortOrder='asc'] - Opcional. Ordem de classificação dos usuários (ascendente ou descendente). Padrão: 'asc'.
   * @param {string} [search=''] - Opcional. Termo de busca para filtrar os usuários pelo nome de usuário. Padrão: ''.
   * @param {string} [role=''] - Opcional. Filtro para buscar apenas usuários com uma função específica. Padrão: ''.
   * @returns {object} - Um objeto JSON contendo a página atual, limite, total de páginas e a lista de usuários.
   * @throws {object} - Um objeto JSON contendo a mensagem de erro em caso de falha na busca dos usuários.
   */

  
  async getAllUsers(req, res) {
    const roleOrder = {
      comum: 1,
      admin: 2,
      corretor: 3,
      financeiro: 4
    };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';
    const search = req.query.search || '';
    const role = req.query.role || '';
  
    try {
      let query = User.find();
  
      if (search) {
        query = query.where('username', { $regex: search, $options: 'i' });
      }
  
      if (role) {
        query = query.where('role', role);
      }

      if (sortField === 'role') {
        query = query.sort((a, b) => {
          const roleA = a.role.toLowerCase();
          const roleB = b.role.toLowerCase();
  
          if (roleOrder[roleA] && roleOrder[roleB]) {
            return sortOrder === 'asc' ? roleOrder[roleA] - roleOrder[roleB] : roleOrder[roleB] - roleOrder[roleA];
          }
  
          return 0;
        });
      } else {
        query = query.sort({ [sortField]: sortOrder });
      }
  
      const users = await query
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ [sortField]: sortOrder });
  
      const count = await User.countDocuments(query);
  
      const totalPages = Math.ceil(count / limit);
  
      res.json({
        page,
        limit,
        totalPages,
        users,
        isLastPage: page >= totalPages
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar os usuários' });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, role } = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      user.username = username;
      user.role = role;

      await user.save();

      res.json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o usuário' });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
      res.status(500).json({ error: 'Erro ao excluir o usuário' });
    }
  },


  async register(req, res) {
    try {
      const { username, password, email } = req.body;

      const { error } = registerSchema.validate({ username, password, email });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).json({ error: errorMessage });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: 'Usuário já existe' });
      }

      const newUser = new User({
        username,
        password: bcrypt.hashSync(password, 10),
        email,
      });

      await newUser.save();

      return res.status(201).json({
        message: 'Usuário registrado com sucesso',
        id: newUser._id,
        name: newUser.username,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        token
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  },

  async forgotPassword(req, res) {
    let resetPasswordURL = '';

    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const resetToken = await user.generatePasswordResetToken();

      await user.save();

      if (process.env.NODE_ENV === 'production') {
        resetPasswordURL = `${process.env.BASE_URL_PROD}/api/users/reset-password/${resetToken}`;
      } else {
        resetPasswordURL = `${process.env.BASE_URL}/api/users/reset-password/${resetToken}`;
      }

      const mailOptions = {
        from: process.env.RECIPIENT_EMAIL,
        to: email,
        subject: 'Redefinição de senha',
        html: `
          <p>Olá,</p>
          <p>Você solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:</p>
          <a href="${resetPasswordURL}">${resetPasswordURL}</a>
          <p>Se você não solicitou a redefinição de senha, ignore este email.</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Um email foi enviado para o seu endereço de email com instruções para redefinir a sua senha' });
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao solicitar redefinição de senha' });
    }
  },

  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;

      // Verificar se o token é válido e se ainda está dentro do prazo de validade
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ error: 'Token inválido ou expirado' });
      }

      // Atualizar a senha do usuário
      user.password = bcrypt.hashSync(password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Salvar as alterações no banco de dados
      await user.save();

      // Retornar uma resposta de sucesso
      return res.status(200).json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao redefinir a senha' });
    }
  }


};

module.exports = UserController;
