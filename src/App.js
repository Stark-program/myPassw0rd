import "./App.css";
import { Modal, Input } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";

function App() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [site, setSite] = useState("");
  const [password, setPassword] = useState("");

  const handleOk = () => {
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
      <div className="column-2">
        <div className="information">
          <h4>Site</h4>
          <a>click here for password</a>
        </div>
      </div>
      <div className="column-3 every-column">
        <button type="primary" onClick={createNewPassword}>
          + Add New Password
        </button>
        <br></br>
        <button>Logout</button>
      </div>
      {renderModal()}
    </div>
  );
}

export default App;
