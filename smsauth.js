require("dotenv").config();

const accountsid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountsid);
const accountauth = process.env.TWILIO_ACCOUNT_AUTHTOKEN;
console.log(accountauth);
const client = require("twilio")(accountsid, accountauth);

client.verify
  .services("test")
  .verificationChecks.create({ to: "+17207635686", code: "123456" })
  .then((check) => {
    console.log(check);
  })
  .catch((err) => {
    console.log(err);
  });
