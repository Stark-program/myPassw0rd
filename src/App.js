import "./App.css";
import "antd/dist/antd.css";
import { useState } from "react";
import RenderWebsiteInfo from "./Components/websiteInfo";
import RenderLogin from "./Components/login";
import RenderPhoneAuthorization from "./Components/phoneAuth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const updateLogin = () => {
    setLoggedIn(true);
  };
  const updateLogOut = () => {
    setLoggedIn(false);
  };

  return <RenderPhoneAuthorization />;

  loggedIn ? (
    <RenderWebsiteInfo updateLogout={updateLogOut} />
  ) : (
    <RenderLogin updateLogin={updateLogin} />
  );
}

export default App;
