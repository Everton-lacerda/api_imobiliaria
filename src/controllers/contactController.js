const nodemailer = require('nodemailer');

const sendContactMessage = async (req, res) => {
    try {
        const { name, email, phone, message, emailSubject } = req.body;
        const recipientEmail = process.env.RECIPIENT_EMAIL;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        }); 

        const mailOptions = {
            from: email,
            to: recipientEmail,
            subject: emailSubject,
            text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`, // Conteúdo do e-mail
        };
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Mensagem de contato enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar mensagem de contato:', error);
        res.status(500).json({ error: 'Erro ao enviar mensagem de contato' });
    }
};

module.exports = {
    sendContactMessage,
};
