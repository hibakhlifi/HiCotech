import { useState } from "react";

const [alertMessage, setAlertMessage] = useState("");
const [showAlert, setShowAlert] = useState(false);
const setAlert = (msg, duration) => {
  setAlertMessage(msg);
  setShowAlert(true);
  setTimeout(() => {
    setShowAlert(false);
  }, duration);
};

export { setAlert, alertMessage, showAlert };
