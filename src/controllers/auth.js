const bcrypt = require("bcryptjs/dist/bcrypt");
const Avatar = require("../models/avatar");

const login = async (req, res) => {
  try {
    const avatar = await Avatar.findOne({ name: req.body.name });
    !avatar ? res.status(400).json({ error: "User not found" }) : null;
    const hash = await bcrypt.compare(req.body.password, avatar.password);
    !hash ? res.status(400).json({ error: "Invalid password" }) : null;
    const jwtToken = avatar.generateJWT();
    res.status(200).json({ token: jwtToken , user: avatar._id, admin: avatar.isAdmin});
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
}; 

exports.login = login;
