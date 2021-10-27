const { Schema, model } = require('mongoose');

const PreguntasSchema = Schema({
    options:Array,
    title:String,
    audio:Object,
});

module.exports = model("preguntas",PreguntasSchema)