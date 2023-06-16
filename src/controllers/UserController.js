const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { registerSchema } = require('../validations/userValidation');

const UserController = {
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

      return res.status(201).json({ message: 'Usuário registrado com sucesso' });
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

      res.json({
        id: user._id,
        name: user.username,
        email: user.email,
        token
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }

};

module.exports = UserController;
