const express = require("express");
const router = express.Router();
const avatar = require('../controllers/avatar');
// const mailer = require("../controllers/mailer");

router.get("/streak/:id" , avatar.getStreakDays);

router.get("/listenreg/:id/:userId" , avatar.listenReg); 

router.get("/listen/:userId" , avatar.listen);

router.get("/regquestions/:id/:userId" , avatar.regQuestion);

router.get("/resolved/:userId" , avatar.resolve);

router.get("/progress/:userId", avatar.progress);

router.get("/regPractice/:id/:userId", avatar.regPractice);

router.put("/updatestrake/:id", avatar.updateStreak);

router.get("/userData/:id", avatar.userData);

router.post("/register", avatar.register);

// router.post("/sendemail", mailer.sendEmail);

module.exports = router;
