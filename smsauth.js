require("dotenv").config();

const accountsid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountsid);
const accountauth = process.env.TWILIO_ACCOUNT_AUTHTOKEN;
console.log(accountauth);
const client = require("twilio")(accountsid, accountauth);

const sid = "VA95a5c43373fd5a6c340323486f3fa69f";
client.verify.services
  .create({ friendlyName: "myPassw0rd Verify!" })
  .then((service) => {
    sid.concat(service.sid);
    console.log(service.sid);
  });
// client.verify
//   .services(sid)
//   .verifications.create({ to: "+17207635686", channel: "sms" })
//   .then((verification) => console.log(verification));

// client.verify
//   .services(sid)
//   .verificationChecks.create({ to: `+17207635686`, code: "950146" })
//   .then((verification_check) => console.log(verification_check))
//   .catch((err) => console.log(err));
