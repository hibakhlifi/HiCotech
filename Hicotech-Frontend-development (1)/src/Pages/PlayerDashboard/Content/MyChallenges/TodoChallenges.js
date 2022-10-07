import React from "react";
import { Col, Row, Card, Avatar, Button, Empty, message } from "antd";
import {
  ClockCircleOutlined,
  CheckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import authService from "../../../../Services/authService";
import assignChallengeService from "../../../../Services/assignChallengeService";

const { Meta } = Card;

const TodoChallenges = ({ data = [], setRefetch }) => {
  const markDone = (defiId) => {
    if (authService.getCurrentUser()) {
      assignChallengeService
        .updateChallengeApi(defiId, {
          done: authService.getCurrentUser().id,
        })
        .then(() => {
          message.success({
            content: "Marqué comme fait avec succès",
            key: "markDone",
            duration: 2,
          });
          setRefetch((prev) => prev + 1);
        })
        .catch(() => {
          message.error({
            content: "Erreur de serveur",
            key: "markDone",
          });
        });
    }
  };
  return (
    <Row gutter={[16, 16]}>
      {data.length === 0 ? (
        <Empty description="Aucune Donnée" style={{ margin: "auto" }} />
      ) : (
        data.map((challenge) => (
          <Col key={uuidv4()}>
            <Card
              title={
                <Meta
                  avatar={
                    <Avatar
                      style={{ color: "white", backgroundColor: "#7265e6" }}
                    >
                      {challenge?.createdBy?.firstName.charAt(0)}
                    </Avatar>
                  }
                  title={
                    <Row justify="space-between">
                      <Col span={8}>
                        {[
                          challenge.createdBy.firstName,
                          " ",
                          challenge.createdBy.lastName,
                        ]}
                      </Col>
                      <Col span={8}>
                        <div
                          style={{
                            color: "gray",
                            fontWeight: "normal",
                          }}
                        >
                          <CalendarOutlined /> {challenge.deadline.slice(0, 10)}
                          <div style={{ marginBottom: 0 }}>
                            <ClockCircleOutlined />{" "}
                            {challenge.deadline.slice(11, 19)}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  }
                />
              }
              style={{ width: 410, marginTop: 16 }}
              actions={[
                <Button
                  id="MarkDoneBtn"
                  className="greenHoverColor"
                  style={{ width: "100%", color: "green" }}
                  onClick={() => markDone(challenge._id)}
                >
                  <CheckOutlined
                    key="setting"
                    twoToneColor="#36a2e1"
                    style={{
                      color: "green",
                    }}
                  />
                  Fini
                </Button>,
              ]}
            >
              <p>
                <b>Défi :</b> <span> {challenge?.defi?.defiName}</span>
              </p>
              <p>
                <b>Objectif :</b> <span> {challenge?.defi?.defiObjectif}</span>
              </p>
              <p>
                <b>Lien utils :</b>{" "}
                <a
                  target="_blank"
                  href={challenge?.defi?.defiLien}
                  rel="noreferrer"
                >
                  cliquez ici
                </a>
              </p>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default TodoChallenges;
