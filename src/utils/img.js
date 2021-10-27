const fs = require("fs");

const uploadImg = (file) => {
  try {
    const route = "../img/" + req.name;
    const img = fs.writeFile(route, file);
    console.log(route);
  } catch (err) {
    console.log(err);
  }
};

exports.uploadImg = uploadImg;