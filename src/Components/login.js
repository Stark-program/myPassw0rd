import { Input, Button, Alert } from "antd";
import MaskedInput from "antd-mask-input";
import { useState } from "react";
import axios from "axios";
import PhoneAuthorization from "./phoneAuth";

const RenderLogin = (props) => {
  const [username, setUSername] = useState("");
  const [password, setPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [renderSmsAuth, setRenderSmsAuth] = useState(false);
  const [authError, setAuthError] = useState(false);
  const serverUrl = "http://localhost:3001";

  const updateSmsAuth = () => {
    setSignUp(false);
    setRenderSmsAuth(false);
  };
  const onClose = () => {
    setAuthError(false);
  };
  const getPhoneAuthorized = async () => {
    await axios
      .post(`${serverUrl}/loginPhoneAuthorization`, { name: username })
      .then((res) => {
        setPhoneNumber(res.data.number);
        setUSername(res.data.name);
        console.log(phoneNumber);
        setRenderSmsAuth(true);

        setPassword("");
        onClose();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const AuthorizationError = () => {
    return (
      <div>
        <Alert
          message={
            <h2 style={{ color: "red" }}>Your phone has not been authorized</h2>
          }
          type="warning"
          closable
          onClose={onClose}
        />
        <Alert
          message="Authorize Phone To Proceed Through Login"
          description={
            <Button type="primary" onClick={getPhoneAuthorized}>
              Authorize Phone
            </Button>
          }
          type="error"
          closable
          onClose={onClose}
        />
      </div>
    );
  };
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
        setRenderSmsAuth(true);
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
        console.log(res);
        if (res.status === 203) {
          alert("Wrong Password");
        }
        if (res.status === 202) {
          props.updateLogin();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.message == "Request failed with status code 406") {
          setUSername("");
          setPassword("");
          alert("User not found");
        }
        if (err.message == "Request failed with status code 409") {
          setAuthError(true);
          console.log("working");
        }
      });
  };

  const renderSignUp = () => {
    return renderSmsAuth ? (
      <PhoneAuthorization
        updateAuth={updateSmsAuth}
        phoneNumber={phoneNumber}
        username={signupUsername}
      />
    ) : (
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
    return renderSmsAuth ? (
      <PhoneAuthorization
        updateAuth={updateSmsAuth}
        phoneNumber={phoneNumber}
        username={username}
      />
    ) : (
      <div className="loginWrapper grid-style">
        <div className="column-1 ">
          {authError ? <AuthorizationError /> : null}
        </div>
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
