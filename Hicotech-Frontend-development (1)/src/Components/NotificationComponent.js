import { notification } from "antd";

function notificationComponent(messageText, descriptionText) {
  const args = {
    message: messageText,
    description: descriptionText,
  };
  notification.open(args);
  return true;
}
export default notificationComponent;
