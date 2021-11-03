const nodemailer = require("nodemailer");
const moment = require("moment");
const Avatar = require("../models/avatar");

const sendEmail = async (req, res) => {
  const { code, clicks, email, name, selections, audioId } = req.body;
  const { semester } = await Avatar.findOne({ _id: req.params.id });
  const date = moment().format("MMMM Do YYYY, h:mm:ss a");
  if (
    !email ||
    email == "" ||
    !code ||
    code == "" ||
    !selections ||
    selections == "" ||
    !name ||
    name == "" ||
    !date ||
    date == ""
  ) {
    return res.status(400).json({
      error: "Porfavor rellene todos lo campos",
    });
  }
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    let mailOptions = {
      to: email,
      subject:
        "repuesta de la evaluacion percentual codigo: " +
        code +
        " realizada por el estudiante " +
        name,
      text:
        "Estudiante de " +
        semester +
        "selecciono dio las siguientes respuestas: ->>" +
        "Grado: " +
        selections.Grado +
        ", Soplocidad: " +
        selections.Soplocidad +
        ", Astenia: " +
        selections.Astenia +
        ", Tension: " +
        selections.Tension +
        ", Aspereza: " +
        selections.Aspereza +
        "<<- en la fecha " +
        date +
        `, reprodujo el audio ` +
        clicks +
        ` veces,` +
        "para el audio de Id " +
        audioId,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email send: " + info.response);
      }
    });
    res.status(200).send({ success: "Email send" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.sendEmail = sendEmail;
