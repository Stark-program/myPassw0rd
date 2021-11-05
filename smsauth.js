require("dotenv").config();

const accountsid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountsid);
const accountauth = process.env.TWILIO_ACCOUNT_AUTHTOKEN;
console.log(accountauth);
const client = require("twilio")(accountsid, accountauth);

const sid = process.env.VERIFICATION_SID;
console.log("this is the sid", sid);
// client.verify.services
//   .create({ friendlyName: "myPassw0rd Verify!" })
//   .then((service) => {
//     sid.concat(service.sid);
//     console.log(service.sid);
//   });
async function runCheck() {
  let check = await client.verify.services(sid);

  console.log("this is check", check);
}
runCheck();
// client.verify
//   .services(sid)
//   .verificationChecks.create({ to: `+17207635686`, code: "141199" })
//   .then((verification_check) => console.log(verification_check))
//   .catch((err) => console.log(err));

// client.verify
//   .services(sid)
//   .verifications("VE4fdb4615ede6c06a00e30279d5edc459")
//   .fetch()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));
