// routes/calculate.js
const express = require('express');
const router = express.Router();
const calculateController = require('../controllers/calculateController');

// Define routes and link them to the controller methods
router.post('/add', calculateController.add);
router.post('/subtract', calculateController.subtract);
router.post('/multiply', calculateController.multiply);
router.post('/divide', calculateController.divide);

module.exports = router;
