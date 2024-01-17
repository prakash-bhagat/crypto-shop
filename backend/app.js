const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const sequelize = require('./config/db')
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
// const config = require('./config/config');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const couponRoutes = require('./routes/couponRoutes');
const carouselRoutes = require('./routes/carouselRoutes');
const adsRoutes = require('./routes/adsRoutes');
const { routesProtection } = require('./middleware/publicRoutesMiddelware');


const app = express();

// middelware config
const corsOptions = {
  // origin: ['http://localhost:4200','http://localhost:4500','http://192.168.43.204:3000/','http://192.168.43.204:8080/','http://127.0.0.1:8080'], // Allow requests only from this origin
  origin:"*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // credentials: true, // Allow sending cookies
  preflightContinue:false,
  optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(cookieParser());
// app.use(routesProtection)
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    // secure: true,
    // httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))

// Define the directory where your static files are located
const staticFilesDirectory = path.join(__dirname, 'public');

// Use express.static middleware to serve static files
app.use('/uploads',express.static(staticFilesDirectory));

// 
// Sync models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced successfully');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

// Serve Angular static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Routes
app.use('/api', routesProtection, productRoutes);
app.use('/api', routesProtection, userRoutes);
app.use('/api', routesProtection, orderRoutes);
app.use('/api', routesProtection, categoryRoutes);
app.use('/api', routesProtection, couponRoutes);
app.use('/api', routesProtection, carouselRoutes);
app.use('/api', routesProtection, adsRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
