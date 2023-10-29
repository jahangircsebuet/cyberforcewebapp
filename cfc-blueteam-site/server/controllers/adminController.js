// const contacts = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');
const db = require('../models');
const users = db.users;
const contacts = db.userData;
const AppError = require('../utils/appError');

exports.admin = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'you are in the admin portal',
  });
});

// get all contact form data
exports.getAllRequests = catchAsync(async (req, res) => {
  const requests = await contacts.findAll();
  // const requests = await users.findAll();

  res.status(200).json({
    status: 'success',
    results: requests.length,
    requests,
  });
});

// get all users 
exports.getAllUsers = catchAsync(async (req, res) => {
  const allusers = await users.findAll();

  res.status(200).json({
    status: 'success',
    results: allusers.length,
    allusers,
  });
});

// delete single contact form data 
exports.deleteRequest = catchAsync(async (req, res, next) => {
  const doc = await contacts.findByPkAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Request deleted successfully',
  });
});


// delete single user 
exports.deleteUser = catchAsync(async (req, res, next) => {
  const doc = await users.findByPkAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User was successfully deleted',
  });
});
