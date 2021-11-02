const nodemailer = require("nodemailer");
const Avatar = require("../models/avatar");
const moment = require("moment");

const sendEmail = async (req, res) => {
  const {code, message, clicks ,email} = req.body;
  const {name} = await Avatar.findOne({ _id: req.params.id });
  const date = moment().format("MMMM Do YYYY, h:mm:ss a");
  if (
    !email ||
    email == "" ||
    !code ||
    code == "" ||
    !message ||
    message == "" ||
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
      subject: "repuesta de la evaluacion percentual codigo: " + code + " realizada por el estudiante " + name,
      text: "Descripcion del estudiante: " + message + ", fecha " + date + `, El estudiante reprodujo el audio ` + clicks + ` veces`,
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