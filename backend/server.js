// AI Productivity Assistant - Backend Server
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Import routes
const emailRoutes = require('./routes/emailRoutes');
const notesRoutes = require('./routes/notesRoutes');
const plannerRoutes = require('./routes/plannerRoutes');

// API routes
app.use('/api', emailRoutes);
app.use('/api', notesRoutes);
app.use('/api', plannerRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'AI Productivity Assistant is running'
    });
});

// Handle frontend routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        error: 'Internal server error'
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});