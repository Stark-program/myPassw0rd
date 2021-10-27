import "./App.css";
import { Modal, Input } from "antd";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import axios from "axios";
import RenderWebsiteInfo from "./Components/websiteInfo";
import RenderLogIn from "./Components/login";
import RenderLogin from "./Components/login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const updateLogin = () => {
    setLoggedIn(true);
  };
  const updateLogOut = () => {
    setLoggedIn(false);
  };

  return loggedIn ? (
    <RenderWebsiteInfo updateLogout={updateLogOut} />
  ) : (
    <RenderLogin updateLogin={updateLogin} />
  );
}

export default App;
