const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app = express();
port = 3000;
app.use(cors());

app.use(express.json());

app.use("/voces", require("./src/routes/voces"));
app.use("/avatar", require("./src/routes/avatar"));
app.use("/preguntas", require("./src/routes/preguntas"));
app.use("/evaluations", require("./src/routes/evaluation"));
app.use("/auth", require("./src/routes/auth"));

// data base connection
async function connect() {
  const db = "mongodb+srv://ejemplo:ejemplo@cluster0.pwo3c.mongodb.net/bancovoces?retryWrites=true&w=majority"; 
  try {
    await mongoose.connect(db, {
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

connect();
app.listen(port, () => {
  console.log("Servidor: ", port);
});
