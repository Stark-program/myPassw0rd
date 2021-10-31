import { Input, Button } from "antd";
import MaskedInput from "antd-mask-input";
import { useState } from "react";
import axios from "axios";

const RenderLogin = (props) => {
  const [username, setUSername] = useState("");
  const [password, setPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [signUp, setSignUp] = useState(false);
  const serverUrl = "http://localhost:3001";

  const onSignup = () => {
    let signupInfo = {
      username: signupUsername,
      password: signupPassword,
      email: email,
      phoneNumber: phoneNumber,
    };

    axios
      .post(`${serverUrl}/signup`, signupInfo)
      .then((res) => {
        setSignUp(false);
        setSignupPassword("");
        setSignupUsername("");
        setEmail("");
        setPhoneNumber("");
        console.log(res);
      })
      .catch((err) => {
        if (err.message == "Request failed with status code 409") {
          alert("Username already exists");
          setSignupPassword("");
          setSignupUsername("");
          setEmail("");
          setPhoneNumber("");
        }
        console.log(err);
      });
  };

  const onLogin = async () => {
    let loginInfo = {
      username: username,
      password: password,
    };

    await axios
      .post(`${serverUrl}/login`, loginInfo)
      .then((res) => {
        // props.updateLogin();
        console.log(res);
      })
      .catch((err) => {
        if (err.message == "Request failed with status code 406") {
          setUSername("");
          setPassword("");
          alert("User not found");
        }
      });
  };

  const renderSignUp = () => {
    return (
      <div className="loginWrapper grid-style">
        <div className="col-1"></div>
        <div className="col-2 every-column">
          <div>
            <h2>Sign up for myPassw0rd!</h2>
          </div>
          <div className="login">
            <Input
              className="login-input"
              addonBefore="Username"
              value={signupUsername}
              onChange={(e) => {
                setSignupUsername(e.target.value);
              }}
            ></Input>
            <Input
              className="login-input"
              addonBefore="Password"
              value={signupPassword}
              onChange={(e) => {
                setSignupPassword(e.target.value);
              }}
            ></Input>
            <Input
              className="login-input"
              addonBefore="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
            <MaskedInput
              className="login-input"
              addonBefore="Phone Number"
              mask="111 111 1111"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            ></MaskedInput>
            <div className="login-details-wrapper">
              <a
                className="login-button-links"
                onClick={() => setSignUp(false)}
              >
                back to login
              </a>
            </div>
            <Button type="primary" onClick={onSignup}>
              Sign Up
            </Button>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    );
  };

  const renderLogIn = () => {
    return (
      <div className="loginWrapper grid-style">
        <div className="column-1 "></div>
        <div className="column-2 every-column login-page-container">
          <div>
            <h1>myPassw0rd! Login</h1>
          </div>
          <div className="login">
            <Input
              className="login-input"
              addonBefore="Username"
              value={username}
              onChange={(e) => {
                setUSername(e.target.value);
              }}
            ></Input>
            <Input
              className="login-input"
              addonBefore="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
            <div className="login-details-wrapper">
              <a className="login-button-links">forgot password</a>
              <a className="login-button-links" onClick={() => setSignUp(true)}>
                signup here!
              </a>
            </div>
            <Button type="primary" onClick={onLogin}>
              Login
            </Button>
          </div>
        </div>
        <div className="column-3"></div>
      </div>
    );
  };

  return <div>{signUp ? renderSignUp() : renderLogIn()}</div>;
};

export default RenderLogin;
