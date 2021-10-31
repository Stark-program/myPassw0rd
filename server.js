require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const website_Info_Schema = require("./Schemas/websiteInfoSchema");
const user_Schema = require("./Schemas/users");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
mongoose.set("returnOriginal", false);
const uri = process.env.MONGODBDEVURI;

connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();
const db = mongoose.connection;

app.post("/websiteinfo", async (req, res) => {
  console.log(req.body);
  let pass = req.body.websitePassword;
  let hashed = await bcrypt.hash(pass, 10);
  let hashedWebsiteInfo = new website_Info_Schema({
    passwordId: req.body.passwordId,
    website: req.body.website,
    password: hashed,
  });

  await hashedWebsiteInfo.save((err, info) => {
    if (err) {
      console.log(err);
      res.sendStatus(err);
    } else {
      console.log(info);
      res.sendStatus(201);
    }
  });

  console.log(hashed);
});

app.get("/websiteinfo", async (req, res) => {
  website_Info_Schema.find({}, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(info);
    }
  });
});

app.post("/getpassword", async (req, res) => {
  let info = await website_Info_Schema.findOne({
    passwordId: req.body.passwordId,
  });
});

app.post("/signup", async (req, res) => {
  let pass = req.body.password;
  let hashedPass = await bcrypt.hash(pass, 10);
  let user = new user_Schema({
    username: req.body.username,
    password: hashedPass,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });

  await user.save((err, info) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
      console.log(info);
    }
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body);
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
