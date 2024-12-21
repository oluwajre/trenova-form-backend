require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');

const contactRoute = require('./routes/contactRoute');
const emailRoute = require('./routes/emailRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', contactRoute);
app.use('/api', emailRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
