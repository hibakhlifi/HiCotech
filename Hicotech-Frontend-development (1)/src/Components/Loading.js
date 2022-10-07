import { Spin } from "antd";

const Loading = () => (
  <div
    style={{
      marginTop: 80,
      width: "100%",
      textAlign: "center",
    }}
  >
    <Spin size="large" tip="Chargement..." />
  </div>
);
export default Loading;
