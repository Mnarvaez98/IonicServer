const { Schema, model } = require('mongoose');

const evaluationSchema = Schema({
    name:String,
    pregunta:String,
    audioId:String,
    Aspereza:Number,
    Tension:Number,
    Soplocidad:Number,
    Grado:Number,
    Astenia:Number,
});

module.exports = model("evaluations", evaluationSchema);