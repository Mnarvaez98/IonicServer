const moment = require("moment");
const Avatar = require("../models/avatar");
const Voces = require("../models/voces");
const Preguntas = require("../models/preguntas");
const Evaluation = require("../models/evaluation");
const uploadImg = require("../utils/img");
const bcrypt = require("bcryptjs/dist/bcrypt");

const getStreakDays = async (req, res) => {
  try {
    const avatar = await Avatar.findById({ _id: req.params.id });
    let { lastdate, daysstrake } = avatar;
    const date = moment();
    console.log(date);
    const diference = date.diff(lastdate, "days");
    if (diference > 1) {
      daysstrake = 0;
    } else {
      if (diference !== 0) {
        ++daysstrake;
      }
    }
    lastdate = date.format();
    await Avatar.findByIdAndUpdate(req.params.id, {
      daysstrake: daysstrake,
      lastdate: lastdate,
    });
    res.json({ strake: daysstrake });
  } catch (error) {
    console.log(error);
  }
};

const listenReg = async (req, res) => {
  try {
    let { audioslisten, audiolistenList } = await Avatar.findById({
      _id: req.params.userId,
    });
    if (!audiolistenList.includes(req.params.id)) {
      audiolistenList.push(req.params.id);
      await Avatar.findByIdAndUpdate(req.params.userId, {
        audiolistenList: audiolistenList,
        audioslisten: ++audioslisten,
      });
      res.json({ listen: `listen audio ${req.params.id}` });
    } else {
      res.json({ listen: `audio ${req.params.id} already listen` });
    }
  } catch (error) {
    console.log(error);
  }
};

const listen = async (req, res) => {
  try {
    const { audioslisten } = await Avatar.findById({
      _id: req.params.userId,
    });
    res.json({ listen: audioslisten });
  } catch (error) {
    console.log(error);
  }
};

const regQuestion = async (req, res) => {
  try {
    let { preguntaslist } = await Avatar.findById({
      _id: req.params.userId,
    });
    if (!preguntaslist.includes(req.params.id)) {
      preguntaslist.push(req.params.id);
      await Avatar.findByIdAndUpdate(req.params.userId, {
        preguntaslist: preguntaslist,
      });
      res.json({ resolve: `questions resolve ${req.params.id}` });
    } else {
      res.json({ resolve: `questions ${req.params.id} already resolve` });
    }
  } catch (error) {
    console.log(error);
  }
};

const regPractice = async (req, res) => {
  try {
    let { practicelist } = await Avatar.findById({
      _id: req.params.userId,
    });
    if (!practicelist.includes(req.params.id)) {
      practicelist.push(req.params.id);
      await Avatar.findByIdAndUpdate(req.params.userId, {
        practicelist: practicelist,
      });
      res.json({ resolve: `practice resolve ${req.params.id}` });
    } else {
      res.json({ resolve: `practice ${req.params.id} already resolve` });
    }
  } catch (error) {
    console.log(error);
  }
};

const resolve = async (req, res) => {
  try {
    const { resolvequestionslist } = await Avatar.findByIdAndUpdate({
      _id: req.params.userId,
    });
    res.json({ resolve: resolvequestionslist });
  } catch (error) {
    console.log(error);
  }
};

const progress = async (req, res) => {
  try {
    let { practicelist, preguntaslist,progress } = await Avatar.findById({
      _id: req.params.userId,
    });
    practicelist = practicelist.length;
    preguntaslist = preguntaslist.length;

    let voces = await Voces.find({});
    voces = voces.length;

    let preguntas = await Preguntas.find({});
    preguntas = preguntas.length;

    let evaluation = await Evaluation.find({});
    evaluation = evaluation.length;

    const practica = trunc(practicelist / voces);
    const preguntas1 = trunc(preguntaslist / preguntas);
    const resEvaluation = trunc(progress.evaluation/evaluation);
    const total = trunc((practicelist + preguntaslist + progress.evaluation) / (voces + preguntas));

    const progress = {
      practica: practica,
      preguntas: preguntas1,
      evluation: resEvaluation,
      total: total,
    };
    res.json({ progress: progress });
  } catch (error) {
    console.log(error);
  }
};

const updateStreak = async (req, res) => {
  try {
    await Avatar.findByIdAndUpdate(req.params.id, {
      strake: req.body.strake,
    });
    console.log(req.body.strake);
    res.status(200).json({ update: "updated" });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

const userData = async (req, res) => {
  try {
    const user = await Avatar.findById({
      _id: req.params.id,
    });
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const register = async (req, res) => {
  try {
    let { name, password, semester, description } = req.body;
    if (!name || !password || !semester || !description) {
      res.status(400).json({ error: "Incomplete data" });
    } else {
      let avatar = await Avatar.findOne({ name: name });
      if (avatar) {
        res
          .status(400)
          .json({ error: "Other user already exists with this name" });
      } else {
        if (req.files) {
          try {
            let imageUrl = "";
            if (req.files) imageUrl = await uploadImg(req.files.img);
          } catch (error) {
            return res.status(400).json({ error });
          }
        }
        const hash = await bcrypt.hash(password, 5);
        avatar = new Avatar({
          name: name,
          strake: 0,
          daysstrake: 0,
          lastdate: moment().format(),
          audioslisten: 0,
          audiolistenList: [],
          preguntaslist: [],
          resolvequestionslist: [],
          practicelist: [],
          password: hash,
          semester: semester,
          description: description,
          progress: {
            practice: 0,
            questions: 0,
            evaluation: 0,
          },
          isAdmin: false,
        });
        await avatar.save();
        res.json({ register: "register avatar" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const saveProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    let { evaluation, questions, test } = req.body;
    console.log(evaluation, questions, test);
    const avatar = await Avatar.findById(userId);
    evaluation <= 0 ? (evaluation = avatar.progress.evaluation) : evaluation;
    questions <= 0 ? (questions = avatar.progress.questions) : questions;
    test <= 0 ? (test = avatar.progress.practice) : test;
    console.log("hasta aqui bien",evaluation, questions, test);
    console.log(avatar.progress)
    await Avatar.findByIdAndUpdate(
      userId ,
      {
        progress: {
          evaluation: evaluation,
          questions: questions,
          practice: test,
        },
      }
    );
    res.status(200).json({ update: "updated" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getActual = async (req, res) => {
  try {
    const avatar = await Avatar.findById(req.params.userId);
    console.log(avatar.progress.questions, avatar.progress.evaluation, avatar.progress.practice);
    res
      .status(200)
      .json({
        questions: avatar.progress.questions,
        practice: avatar.progress.practice,
        evaluation: avatar.progress.evaluation,
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Avatar.find({});
    res.status(200).json({ users: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

function trunc(x, posiciones = 2) {
  let s = x.toString();
  let decimalLength = s.indexOf(".") + 1;
  let numStr = s.substr(0, decimalLength + posiciones);
  return Number(numStr);
}

exports.getStreakDays = getStreakDays;
exports.listenReg = listenReg;
exports.listen = listen;
exports.regQuestion = regQuestion;
exports.resolve = resolve;
exports.progress = progress;
exports.regPractice = regPractice;
exports.updateStreak = updateStreak;
exports.userData = userData;
exports.register = register;
exports.saveProgress = saveProgress;
exports.getActual = getActual;
exports.getUsers = getUsers;