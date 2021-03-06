const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = "users";
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  phoneNumber: String,
  phoneAuthorized: Boolean,
});

const user_Schema = mongoose.model(users, userSchema);

module.exports = user_Schema;
