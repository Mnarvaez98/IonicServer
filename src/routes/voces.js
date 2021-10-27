const express = require("express");
const router = express.Router();
const Voces = require("../controllers/voces");

router.get("/", Voces.vocesGet);

router.get("/name/:name", Voces.vocesGetByName);

router.post("/", Voces.vocesPost);


module.exports = router;
