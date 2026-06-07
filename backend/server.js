require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const adminProductsRoutes = require('./routes/admin/products-routes');
const shopProductsRoutes = require('./routes/shop/products-routes');
const shopCartRoutes = require('./routes/shop/cart-routes');
const shopAddressRoutes = require('./routes/shop/address-routes');
// 1. Load config FIRST before importing routes or models
dotenv.config();
const shopOrderRoutes = require('./routes/shop/order-routes');


const authRoutes = require('./routes/auth/auth-routes');
const app = express();
const port = process.env.PORT || 3000;

// 2. Middleware pipeline configuration
app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 3. Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/products', adminProductsRoutes);
app.use('/api/shop/products', shopProductsRoutes);
app.use('/api/shop/cart', shopCartRoutes);
app.use('/api/shop/address', shopAddressRoutes);
app.use('/api/shop/order', shopOrderRoutes);
// 4. Connect to database
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('Database error :', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
