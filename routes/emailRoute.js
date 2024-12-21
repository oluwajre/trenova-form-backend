const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { to, userName, schoolName, webinarDetails } = req.body;

    const subjectContent = `Thank you for joining the Scale Up Series Webinar`;
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #112F3A; font-size: 1.2rem;">
            <h1 style="font-size: 1.7rem; color: #5E17DD;">Welcome onboard!</h1>
            <p>Dear <strong>${userName}</strong> of ${schoolName},</p>
            <p>Thank you for registering for our <strong>${webinarDetails.theme}</strong> webinar on <strong>${webinarDetails.topic}</strong>.</p>
            <p><strong>Date:</strong> ${webinarDetails.date}</p>
            <p><strong>Time:</strong> ${webinarDetails.time}</p>
            <a href="${webinarDetails.whatsappLink}" style="display: inline-block; padding: 10px 20px; background: #198754; color: #fff; text-decoration: none; border-radius: 5px;">Join WhatsApp Group</a>
        </div>
    `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER_TRENOVA,
            pass: process.env.EMAIL_PASS_TRENOVA,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `${webinarDetails.theme} <${process.env.EMAIL_USER_TRENOVA}>`,
            to,
            subject: subjectContent,
            html: htmlContent,
        });
        res.status(200).json({ success: true, message: `Email sent: ${info.response}` });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send the email.' });
    }
});

module.exports = router;
