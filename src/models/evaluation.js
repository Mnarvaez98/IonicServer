const { Schema, model } = require('mongoose');

const evaluationSchema = Schema({
    name:String,
    pregunta:String,
    audioId:String,
});

module.exports = model("evaluations", evaluationSchema);