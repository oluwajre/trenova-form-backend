const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/contact/send-message', async (req, res) => {
    const { name, email, message, subject, phone } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER_TRINITWIN,
            pass: process.env.EMAIL_PASS_TRINITWIN,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL_TRINITWIN,
        subject: subject || 'New Contact Form Message',
        text: `${name} has contacted you from your Trinitwin website contact form, below are the details of the Form:\n\nName: ${name}\nEmail: ${email}\nPhone Number: ${phone || 'Phone Number not provided'}\n\nMessage:\n${message}\n\nKindly reply ${name}.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send the message.' });
    }
});

module.exports = router;
