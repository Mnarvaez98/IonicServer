const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { email, code, message, name, date } = req.body;
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
      subject: "repuesta del evaluacion percentual codigo:" + code + " realizada por " + name,
      text: message + " " + date,
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