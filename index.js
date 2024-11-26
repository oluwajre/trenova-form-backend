require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors'); // Import CORS
const nodemailer = require('nodemailer');

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body

// Email sending logic
app.post('/send-email', async (req, res) => {
  const { to, userName, schoolName, webinarDetails } = req.body;

  const subjectContent = `Thank you for joining the Scale Up Series Webinar`;

  // Default HTML content if no HTML is provided
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #112F3A; font-size: 1.2rem;">
        <div>
            <h1 style="font-size: 1.7rem; color: #5E17DD; margin-bottom: 1rem;">Welcome onboard!</h1>
            <p>Dear <span style="font-weight: 600;">${userName}</span>, of ${schoolName}.</p>
            <p style="line-height: 1.4em;">Thank you for registering for our upcoming <span style="font-weight: 600;">${webinarDetails.theme}</span> We’re thrilled to have you with us as we explore <span style="font-weight: 600; text-transform: lowercase; border-bottom: 2px solid #5E17DD;">${webinarDetails.topic}</p>
        </div>
        <div style="margin-top: .5rem;">
            <h3>Webinar Details</h3>
            <ul style="list-style-type: none; padding-left: .2em;">
                <li style="margin-bottom: .5em;"><span style="font-weight: 600; margin-left: .2em;">Date: </span>${webinarDetails.date}</li>
                <li style="margin-bottom: .5em;"><span style="font-weight: 600; margin-left: .2em;">Time: </span>${webinarDetails.time}</li>
                <li style="margin-bottom: .5em;"><span style="font-weight: 600; margin-left: .2em;">Platform: </span>${webinarDetails.platform.name}</li>
            </ul>
        </div>
        <div style="text-align: center; margin-top: 1.5rem; margin-bottom: 1rem;">
            <p style="color: #ff0890; font-size: 1em;">For more details about the webinar, click the <span style="font-weight: 600; color: #198754; text-decoration: underline;"><a href=${webinarDetails.whatsappLink} style="color: inherit; text-decoration: none;">"Join Now"</a></span> WhatsApp button below to join our <span style="font-weight: 600; color: #198754; text-decoration: underline;"><a href=${webinarDetails.whatsappLink} style="color: inherit; text-decoration: none;">official WhatsApp group</a></span>.</p>
            <a href=${webinarDetails.whatsappLink} type="button" style="margin-top: .65rem; padding: .5rem 1.5rem; font-family: Arial, sans-serif; border-radius: 5px; border: 1px solid #198754; color: white; background-color: #198754; font-size: 1.2em; display: inline-flex; align-items: center; gap: .3em; text-decoration: none;">
               Join Now
            </a>
        </div>
    </div>
  `;

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS, // Use environment variables
    },
  });

  try {
    // Send email with HTML content
    const info = await transporter.sendMail({
      from: `${webinarDetails.theme} <${process.env.EMAIL_USER}>`,
      to,
      subject: subjectContent,
      html: htmlContent, // Only sending HTML content
    });
    res.status(200).send(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
