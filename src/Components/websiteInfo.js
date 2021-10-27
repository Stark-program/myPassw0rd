import { Modal, Input } from "antd";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import axios from "axios";

const RenderWebsiteInfo = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [site, setSite] = useState("");
  const [password, setPassword] = useState("");
  const [information, setInformation] = useState([]);
  const serverUrl = "http://localhost:3001";

  useEffect(() => {
    async function fetchData() {
      await axios.get(`${serverUrl}/websiteinfo`).then((res) => {
        let data = res.data;
        setInformation(data);
      });
    }
    fetchData();
  }, []);

  const handleOk = async () => {
    let websiteInformation = {
      passwordId: Math.floor(Math.random() * 1000000000),
      website: site,
      websitePassword: password,
    };

    setInformation([...information, websiteInformation]);

    await axios
      .post(`${serverUrl}/websiteinfo`, websiteInformation)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setModalText("The window will be closed after two seconds");
    setConfirmLoading(true);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setModalText("");
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const createNewPassword = () => {
    setSite("");
    setPassword("");
    setVisible(true);
  };

  const getPassword = async (e) => {
    let passwordId = { passwordId: e.target.id };
    await axios
      .post(`${serverUrl}/getpassword`, passwordId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(e.target.id);
  };

  const renderContent = (data) => {
    return (
      <div className="information" key={data.passwordId}>
        <h4>{data.website}</h4>
        <button
          id={data.passwordId}
          key={data.passwordId}
          onClick={getPassword}
        >
          click here to get your password
        </button>
      </div>
    );
  };
  const renderModal = () => {
    return (
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          className="modal-input"
          placeholder="input Site password is used on"
          addonBefore="Site"
          value={site}
          onChange={(e) => {
            setSite(e.target.value);
          }}
        />
        <Input
          className="modal-input"
          placeholder="input password used for site"
          addonBefore="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {modalText}
      </Modal>
    );
  };

  return (
    <div className="App">
      <div className="column-1 every-column">
        <h1>myPassw0rd!</h1>
      </div>
      <div className="column-2">{information.map(renderContent)}</div>
      <div className="column-3 every-column">
        <button type="primary" onClick={createNewPassword}>
          + Add New Password
        </button>
        <br></br>
        <button onClick={props.updateLogout}>Logout</button>
      </div>
      {renderModal()}
    </div>
  );
};

export default RenderWebsiteInfo;
