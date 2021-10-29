import { Input, Button } from "antd";
import { useState } from "react";

const RenderLogin = (props) => {
  const [username, setUSername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="loginWrapper grid-style">
      <div className="column-1 "></div>
      <div className="column-2 every-column">
        <Input
          addonBefore="Username"
          value={username}
          onChange={(e) => {
            setUSername(e.target.value);
          }}
        ></Input>
        <Input
          addonBefore="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>
        <Button type="primary" onClick={props.updateLogin}>
          Login
        </Button>
      </div>
      <div className="column-3"></div>
    </div>
  );
};

export default RenderLogin;
