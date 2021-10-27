const express = require("express");
const router = express.Router();
const avatar = require('../controllers/auth')

router.post('/login', avatar.login);

module.exports = router;
