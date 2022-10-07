import { useEffect, useState } from "react";
import { Calendar, Badge, Modal, Row, Col, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Map from "../../../../Components/Map";

const ScheduledSessions = ({ sessionData = [] }) => {
  const [sessionDates, setsessionDates] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState({});
  const [openMap, setOpenMap] = useState(false);
  useEffect(() => {
    setsessionDates(
      sessionData.map((session) => {
        const dateSeance = new Date(session.dateSeance);
        dateSeance.setHours(dateSeance.getHours() - 1);
        return { ...session, dateSeance };
      })
    );
  }, [sessionData]);
  const dateCellRender = (value) => {
    const session = sessionDates.find(
      (session) =>
        session?.dateSeance.toLocaleDateString() ===
        value._d.toLocaleDateString()
    );
    return (
      session && (
        <div
          key={uuidv4()}
          style={{ height: "100%" }}
          onClick={() => {
            setIsModalVisible(true);
            setSelectedSession(session);
          }}
        >
          <ul className="events">
            <Badge
              color={session?.sessionCancelled?.isCancelled ? "red" : "green"}
              text={`Séance : ${session?.seanceName}`}
            />
          </ul>
        </div>
      )
    );
  };
  return (
    <>
      <Modal
        title="Détails de la séance"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        okText="Confirmer"
        cancelText="Annuler"
        footer={() => null}
      >
        <Row justify="space-between">
          <Col span={8}>
            <p>
              <strong>Séance</strong> : {selectedSession?.seanceName}
            </p>
            <strong>Séance annulé</strong> :
            {selectedSession?.sessionCancelled?.isCancelled ? " oui" : " non"}
          </Col>
          <Col span={8}>
            <div
              style={{
                color: "gray",
                fontWeight: "normal",
              }}
            >
              <CalendarOutlined />{" "}
              {selectedSession?.dateSeance?.toLocaleDateString()}
              <div style={{ marginBottom: 0 }}>
                <ClockCircleOutlined />{" "}
                {selectedSession?.dateSeance?.toLocaleTimeString()}
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <strong>
          Lieu :{" "}
          <Button
            onClick={() => {
              setOpenMap(true);
            }}
            icon={<EnvironmentOutlined />}
          >
            Ouvrir la carte
          </Button>{" "}
        </strong>
        <br />
        <br />
        <Map
          visible={openMap}
          editable={false}
          setvisibility={setOpenMap}
          initialPosition={selectedSession?.trainingGround?.coordinates}
        />
      </Modal>
      <Calendar dateCellRender={dateCellRender} />
    </>
  );
};

export default ScheduledSessions;
