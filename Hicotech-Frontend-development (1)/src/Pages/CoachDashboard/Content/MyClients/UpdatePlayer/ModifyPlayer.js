import { useEffect, useState } from "react";
import { PageHeader, Tabs, Statistic, Row, Col, Alert, Spin } from "antd";
import { useLocation } from "react-router-dom";
import Title from "antd/lib/typography/Title";
import UpdatePlayerProfile from "./UpdatePlayerProfile";
import DisplayStats from "../DisplayStats/DisplayStats";
import userService from "../../../../../Services/userService";
import "./ModifyPlayer.css";

const ModifyPlayer = () => {
  const [player, setPlayer] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { id } = location.state;
  useEffect(() => {
    setLoading(true);
    userService.getUserApi(id).then(({ data }) => {
      setPlayer(data);
      setLoading(false);
    });
  }, []);
  const { TabPane } = Tabs;
  return (
    <>
      <Title>Modifier Joueur</Title>
      {alert && (
        <Row justify="center">
          <Col>
            <Alert
              message={alert.message}
              type={alert.type}
              showIcon
              closable
            />
          </Col>
        </Row>
      )}
      <Spin spinning={loading}>
        <PageHeader
          onBack={() => window.history.back()}
          avatar={{
            src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
          }}
          title={`${player.firstName} ${player.lastName}`}
          extra={[
            <Statistic
              title="Status"
              value={player.active ? "active" : "pas active"}
              valueStyle={
                player.active ? { color: "#3f8600" } : { color: "#cc0000" }
              }
              style={{ marginRight: "100px" }}
            />,
            <Statistic
              title="Prix Séance"
              value={player.sessionPrice ? `${player.sessionPrice} TND` : "--"}
              valueStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              style={{
                marginRight: "100px",
              }}
            />,
            <Statistic
              title="IMC"
              value={player.IMC ? player.IMC.name : "--"}
              valueStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              style={{
                marginRight: "100px",
              }}
            />,
          ]}
        />

        <Tabs defaultActiveKey="1">
          <TabPane tab="Modifier information" key="1">
            <UpdatePlayerProfile
              user={player}
              setPlayer={setPlayer}
              setAlert={setAlert}
            />
          </TabPane>
          <TabPane tab="Les Buts à atteindre" key="2">
            <DisplayStats player={player} setAlert={setAlert} />
          </TabPane>
        </Tabs>
      </Spin>
    </>
  );
};
export default ModifyPlayer;
