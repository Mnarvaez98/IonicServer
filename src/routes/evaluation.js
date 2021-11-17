const express = require('express');
const router = express.Router();
const Evaluation = require('../controllers/evaluation.js');

router.get('/getall', Evaluation.getAllEvaluations);

module.exports = router; 