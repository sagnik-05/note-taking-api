const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Note-Taking API. Use /notes for API endpoints.');
});

// API routes
app.use('/notes', noteRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;