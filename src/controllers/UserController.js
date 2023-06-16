const bcrypt = require('bcryptjs');
const User = require('../models/User');

const UserController = {
    async register(req, res) {
        try {
            const { username, password, email } = req.body;

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
};

module.exports = UserController;
