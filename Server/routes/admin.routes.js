const express = require('express');
const router = express.Router();
const AdminControllers = require('../controllers/adminControllers');
const checkAdminAuth  = require('../middlewares/adminAuth');
const checkBlacklist = require('../middlewares/checkBlacklist');

// Route level Middleware - to protect Route
// router.use('/changepassword', checkAdminAuth);
// router.use('/loggedAdmin', checkAdminAuth);
// router.use('/jwt/logout', checkAdminAuth, checkBlacklist); // Applied checkUserAuth first, then checkBlacklist

// Public Routes
router.post('/register', AdminControllers.adminRegistration);
router.post('/login', AdminControllers.adminLogin);
router.post('/send-reset-password-email', AdminControllers.sendAdminPasswordResetEmail);
router.post('/reset-password/:id/:token', AdminControllers.sendAdminPasswordReset);

// Protected Routes
router.post('/changepassword',checkAdminAuth , AdminControllers.changeAdminPassword);
router.get('/loggedAdmin', checkAdminAuth, AdminControllers.loggedAdmin);
router.post('/jwt/logout', checkAdminAuth, checkBlacklist, AdminControllers.adminLogout);


module.exports = router;
