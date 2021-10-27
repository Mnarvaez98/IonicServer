const Evaluation = require('../models/evaluation');

const getAllEvaluations = async (req, res) => {
    try{
        const evaluations = await Evaluation.find();
        res.json(evaluations);
    } catch(e){
        res.status(500).send({message: 'Error en el servidor'});
    }
}

exports.getAllEvaluations = getAllEvaluations;