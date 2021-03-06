const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app = express();
app.use(express.json());
app.use(cors());
app.use("/voces", require("./src/routes/voces"));
app.use("/avatar", require("./src/routes/avatar"));
app.use("/preguntas", require("./src/routes/preguntas"));
app.use("/evaluations", require("./src/routes/evaluation"));
app.use("/auth", require("./src/routes/auth"));

// data base connection
async function connect() {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("BD ok");
  } catch (error) {
    console.log(error);
    throw new Error("BD error");
  }
}

app.listen(process.env.PORT, () => {
  console.log("Servidor: ", process.env.PORT);
});
connect();