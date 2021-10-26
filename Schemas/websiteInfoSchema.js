const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwords = "passwords";
const websiteInfoSchema = new Schema({
  passwordId: Number,
  website: String,
  password: String,
});

const websiteInfo_Schema = mongoose.model(passwords, websiteInfoSchema);

module.exports = websiteInfo_Schema;
