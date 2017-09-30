var express = require('express');
var router = express.Router();
var passportConfig = require('../config/passport.config');

const alarmsController = require('../controllers/alarms.controller');

router.get('/', passportConfig.isAuthenticated, alarmsController.getAll);
router.get('/:id', passportConfig.isAuthenticated, alarmsController.get);
router.post('/', passportConfig.isAuthenticated, alarmsController.create);
router.delete('/', passportConfig.isAuthenticated, alarmsController.delete);


module.exports = router;