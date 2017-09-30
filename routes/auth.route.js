var express = require('express');
var router = express.Router();
var passportConfig = require('../config/passport.config');

const authController = require('../controllers/auth.controller');

router.post('/login', authController.postLogin);
router.post('/register', authController.postRegister);
router.post('/logout', passportConfig.isAuthenticated, authController.postLogout);

module.exports = router;