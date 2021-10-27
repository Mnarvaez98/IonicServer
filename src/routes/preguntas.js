const express = require("express");
const router = express.Router();
const Preguntas = require('../controllers/preguntas.js')

router.get('/', Preguntas.getPreguntas);


module.exports = router;
