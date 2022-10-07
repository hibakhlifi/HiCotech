import React from "react";
import { Col, Row, Card, Avatar, Empty } from "antd";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const { Meta } = Card;

const DoneChallenges = ({ data = [] }) => (
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
                        <CalendarOutlined /> {challenge?.deadline.slice(0, 10)}
                        <div style={{ marginBottom: 0 }}>
                          <ClockCircleOutlined />{" "}
                          {challenge?.deadline.slice(11, 19)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                }
              />
            }
            style={{ width: 410, marginTop: 16 }}
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

export default DoneChallenges;
