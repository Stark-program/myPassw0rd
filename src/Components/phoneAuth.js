import { Input, Button } from "antd";
import axios from "axios";
import MaskedInput from "antd-mask-input";
require("dotenv").config();

const PhoneAuthorization = (props) => {
  return (
    <div className="phoneauth-wrapper">
      <div className="column-1"></div>
      <div className="digit-input column-2 every-column">
        <h2>Enter in the six digit code sent to your phone</h2>
        <MaskedInput
          className="phoneAuthInput"
          style={{ margin: "5px", maxWidth: "100px", textAlign: "center" }}
          mask="111111"
        ></MaskedInput>
        <Button type="primary" onClick={props.updateAuth}>
          Authorize
        </Button>
      </div>
      <div className="column-3"></div>
    </div>
  );
};

export default PhoneAuthorization;
