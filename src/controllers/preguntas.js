const Preguntas = require("../models/preguntas.js");

const getPreguntas = async (req, res) => {
  try {
    const preguntas = await Preguntas.find();
    res.status(200).json(preguntas);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

exports.getPreguntas = getPreguntas;
