const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Import routes
const cartRoutes = require('./routes/cartRoute');
const orderRoutes = require('./routes/orderRoute');
const itemRoutes = require('./routes/companyItem.route'); // Changed naming convention
const companyRoutes = require('./routes/company.route');
const shopkeeperRoutes = require("./routes/shopkeeper.route")

// Initialize Express app
const app = express();

// Middleware
const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Vite's default ports
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['set-cookie']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/item', itemRoutes); // Updated route name
app.use('/api/company', companyRoutes);
app.use('/api/shopkeeper', shopkeeperRoutes); 

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Internal Server Error',
        error: err.message 
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});