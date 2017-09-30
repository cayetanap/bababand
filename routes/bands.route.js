var express = require('express');
var router = express.Router();
var passportConfig = require('../config/passport.config');

const bandsController = require('../controllers/bands.controller');

router.get('/', passportConfig.isAuthenticated, bandsController.getAll);
router.get('/:id', passportConfig.isAuthenticated, bandsController.get);
router.post('/', passportConfig.isAuthenticated, bandsController.create);
router.delete('/', passportConfig.isAuthenticated, bandsController.delete);
router.post('/:id/geo', passportConfig.isAuthenticated, bandsController.addLocation);

module.exports = router;