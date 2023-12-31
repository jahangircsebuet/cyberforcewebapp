const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/forgotPassword/:token').post(authController.forgotPassword);
router.route('/resetpassword/').patch(authController.resetPassword);

// router.route('/der-data/sol').get(userController.getAllSolarData);
router.route('/der-data/sql').get(userController.getSQL);

module.exports = router;
