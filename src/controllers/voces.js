const Voces = require("../models/voces");

const vocesGet = async (req = request, res = response) => {
  const voces = await Voces.find({});
  res.json(voces);
};

const vocesGetByName = async (req = request, res = response) => {
  const Name = req.params.name;
  const voces = await Voces.findOne({ Name: Name });
  res.json(voces);
};

const vocesPost = async (req = request, res = response) => {
  const { Name, Tension } = req.body;
  const voz = new Voces({
    Name,
  });
  await voz.save();
  res.json(voces);
};


exports.vocesGet = vocesGet;
exports.vocesGetByName = vocesGetByName;
exports.vocesPost = vocesPost;
