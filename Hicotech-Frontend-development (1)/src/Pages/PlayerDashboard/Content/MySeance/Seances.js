import React, { useState, useEffect } from "react";
import {
  Typography,
  Tabs,
  Row,
  Col,
  Spin,
  Space,
  Drawer,
  Collapse,
} from "antd";
import moment from "moment";
import {
  getSeancePlayerApi,
  getAllSeanceApi,
} from "../../../../Services/SeancesService";
import SeanceCard from "./SeanceCard";
import authService from "../../../../Services/authService";

const { TabPane } = Tabs;
const { Title } = Typography;
const { Panel } = Collapse;

const Seances = () => {
  const [loading, setLoading] = useState(false);
  const [seances, setSeances] = useState({});
  const [visible, setVisible] = useState(false);
  const currentUser = authService.getCurrentUser();
  const [key, setKey] = useState("1");
  const [seanceSelected, setSeanceSelected] = useState({});

  const onClose = () => {
    setVisible(false);
  };

  async function getSeances() {
    setLoading(false);
    await getAllSeanceApi({ player: currentUser.id })
      .then((response) => {
        setSeances(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }
  async function getSeancesByDate(data) {
    setLoading(false);
    await getSeancePlayerApi(currentUser.id, data)
      .then((response) => {
        setSeances(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getSeances();
  }, []);
  function callback(key) {
    if (key === "2") {
      setKey("2");
      getSeancesByDate({
        from: moment(new Date()).format("yyyy-MM-DDT00:00:00"),
        to: moment(new Date()).format("yyyy-MM-DDT23:59:59"),
      });
    } else if (key === "1") {
      setKey("1");
      getSeances({});
    }
  }
  return (
    <>
      <Title level={2}>les séances :</Title>
      {loading && (
        <Tabs defaultActiveKey={key} onChange={callback}>
          <TabPane tab="Toutes les séances " key="1">
            <div className="site-card-wrapper">
              <Row gutter={16}>
                {seances.map((seance) => (
                  <SeanceCard
                    seance={seance}
                    key={seance._id}
                    loading={loading}
                    setVisible={setVisible}
                    setSeanceSelected={setSeanceSelected}
                  />
                ))}
              </Row>
            </div>
          </TabPane>
          <TabPane tab="Les séances D`aujourdui " key="2">
            <div className="site-card-wrapper">
              <Row gutter={16}>
                {seances.map((seance) => (
                  <SeanceCard
                    seance={seance}
                    key={seance._id}
                    loading={loading}
                    setVisible={setVisible}
                    setSeanceSelected={setSeanceSelected}
                  />
                ))}
              </Row>
            </div>
          </TabPane>
        </Tabs>
      )}
      {!loading && (
        <Row gutter={16}>
          <Col span={8}>
            <Space size="middle" style={{ marginTop: 250, marginLeft: 600 }}>
              <Spin size="large" tip="Loading..." />
            </Space>
          </Col>
        </Row>
      )}
      {visible && (
        <Drawer
          title={seanceSelected.seanceName}
          placement="right"
          onClose={onClose}
          size="large"
          visible={visible}
          key={seanceSelected._id}
        >
          <p>Programme : {seanceSelected.programme.title} </p>
          <p>
            coach : {seanceSelected.creactedBy.firstName}{" "}
            {seanceSelected.creactedBy.lastName}{" "}
          </p>
          <p>
            Date Seance :{" "}
            {moment(seanceSelected.dateSeance).format("YYYY-MM-DD HH:MM")}
          </p>
          <p>
            trainingGround: {seanceSelected.trainingGround.city} ,{" "}
            {seanceSelected.trainingGround.address}{" "}
          </p>
          {seanceSelected.feedback && (
            <p>
              feedback: <br /> {seanceSelected.feedback.description}{" "}
            </p>
          )}
          {seanceSelected.sessionCancelled.isCancelled && (
            <p>sessionCancelled {seanceSelected.sessionCancelled.reason} </p>
          )}
          <Collapse defaultActiveKey={["1"]} onChange={callback}>
            <Panel header="statistic" key="2">
              {seanceSelected.statistics.map(({ statistic }) => (
                <p>
                  {statistic.statisticName} <br /> {statistic.description}
                </p>
              ))}
            </Panel>
            <Panel header="Skills" key="3">
              {seanceSelected.skills.map(({ skill }) => (
                <p>
                  {skill.statisticName} <br /> {skill.description}
                </p>
              ))}
            </Panel>
          </Collapse>
        </Drawer>
      )}
    </>
  );
};

export default Seances;
