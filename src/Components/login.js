import { Input } from "antd";

const RenderLogin = (props) => {
  return (
    <div className="loginWrapper">
      <Input addonBefore="Username"></Input>
      <Input addonBefore="Password"></Input>
      <button onClick={props.updateLogin}>Login</button>
    </div>
  );
};

export default RenderLogin;
