require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
mongoose.set("returnOriginal", false);

app.post("/websiteinfo", async (req, res) => {
  console.log("posted");
  console.log(req.body);
  let pass = req.body.websitePassword;

  let hashed = await bcrypt.hash(pass, 10);
  console.log(hashed);
  res.sendStatus(201);
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
