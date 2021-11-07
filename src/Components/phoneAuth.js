import { Input, Button } from "antd";
import axios from "axios";
import MaskedInput from "antd-mask-input";
import { useEffect, useState } from "react";
require("dotenv").config();

const PhoneAuthorization = (props) => {
  console.log(props);
  const [digits, setDigits] = useState("");
  const serverUrl = "http://localhost:3001";

  const verifyPhone = async () => {
    await axios
      .post(`${serverUrl}/phoneVerification`, {
        code: digits,
        number: props.phoneNumber,
        name: props.username,
      })
      .then((res) => {
        if (res.status === 201) {
          props.updateAuth();
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="phoneauth-wrapper">
      <div className="column-1"></div>
      <div className="digit-input column-2 every-column">
        <h2>Enter in the six digit code sent to your phone</h2>
        <MaskedInput
          className="phoneAuthInput"
          style={{ margin: "5px", maxWidth: "100px", textAlign: "center" }}
          mask="111111"
          onChange={(e) => {
            setDigits(e.target.value);
          }}
        ></MaskedInput>
        <Button type="primary" onClick={verifyPhone}>
          Authorize
        </Button>
      </div>
      <div className="column-3"></div>
    </div>
  );
};

export default PhoneAuthorization;
