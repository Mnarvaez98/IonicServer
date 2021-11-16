const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const AvatarSchema = new mongoose.Schema({
  name: String,
  daysstrake: Number,
  lastdate: String,
  audioslisten: Number,
  audiolistenList: Array,
  resolvequestionslist: Array,
  practicelist: Array,
  preguntaslist: Array,
  strake: Number,
  password: String,
  semester: String,
  description: String,
  progress:{
    practice: Number,
    questions: Number,
    evaluation: Number,
  },
  isAdmin: Boolean,
});

AvatarSchema.methods.generateJWT = function () {
  return jwt.sign(
    { 
      _id: this._id,
      name: this.name,
      lastdate: this.lastdate,
      semester: this.semester,
      iat: moment().unix(),
    },
    process.env.SECRET_KEY_JWT
  );
};

const Avatar = mongoose.model("users", AvatarSchema);
module.exports = Avatar;
