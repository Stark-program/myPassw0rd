require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const website_Info_Schema = require("./Schemas/websiteInfoSchema");
const user_Schema = require("./Schemas/users");
const accountsid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountsid);
const accountauth = process.env.TWILIO_ACCOUNT_AUTHTOKEN;
console.log(accountauth);
const client = require("twilio")(accountsid, accountauth);

const sid = process.env.VERIFICATION_SID;

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
  let checkUser = await user_Schema.exists({ username: req.body.username });
  console.log(checkUser);
  if (!checkUser) {
    let user = new user_Schema({
      username: req.body.username,
      password: hashedPass,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      phoneAuthorized: false,
    });
    await user.save((err, info) => {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(201);
        client.verify
          .services(sid)
          .verifications.create({
            to: `+1${req.body.phoneNumber}`,
            channel: "sms",
          })
          .then((verification) => console.log(verification.status));
        console.log(info);
      }
    });
  } else {
    res.sendStatus(409);
  }
});

app.post("/login", async (req, res) => {
  let user = await user_Schema.findOne({ username: req.body.username });
  if (!user) {
    res.status(406).send("user not found");
  }

  if (user) {
    console.log(user);
    let pass = req.body.password;

    bcrypt.compare(pass, user.password, function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log("this is result", result);
        if (!user.phoneAuthorized) {
          return res.sendStatus(409);
        } else res.sendStatus(202);
      } else {
        res.sendStatus(203);
      }
    });
  }
  console.log(req.body);
});

app.post("/phoneVerification", async (req, res) => {
  console.log("this is the code and shit", req.body);
  client.verify
    .services(sid)
    .verificationChecks.create({
      to: `+1${req.body.number}`,
      code: `${req.body.code}`,
    })
    .then(async (verification_check) => {
      let verifyStatus = verification_check.status;
      if (verifyStatus === "approved") {
        let user = await user_Schema.findOne({ username: req.body.name });
        user.phoneAuthorized = true;
        await user.save();
        res.sendStatus(201);
      }
    })
    .catch((err) => console.log(err));
});
app.post("/loginPhoneAuthorization", async (req, res) => {
  let user = await user_Schema.findOne({ username: req.body.name });

  client.verify
    .services(sid)
    .verifications.create({
      to: `+1${user.phoneNumber}`,
      channel: "sms",
    })
    .then((verification) => {
      res.json({ number: user.phoneNumber, name: user.username });
      console.log(verification.status);
    });

  console.log(user);
  console.log(req.body);
});
app.listen(3001, () => {
  console.log("listening on port 3001");
});
