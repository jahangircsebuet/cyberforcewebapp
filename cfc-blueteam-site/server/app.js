const express = require('express');
// const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactRoutes');
const adminRouter = require('./routes/adminRoutes');
const app = express();
const authController = require('./controllers/authController');


const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// app.use(cors());

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) MAIN ROUTES
app.use('/api/contact-data', contactRouter);

app.use('/api/users', userRouter);

// TODO uncomment the below line to add API authentication 
// app.use('/api/admin', authController.protect, adminRouter);
// this is to check admin APIs without authentication 
app.use('/api/admin', adminRouter);

app.use(globalErrorHandler); // mostly unused

// 4) START SERVER
module.exports = app;
