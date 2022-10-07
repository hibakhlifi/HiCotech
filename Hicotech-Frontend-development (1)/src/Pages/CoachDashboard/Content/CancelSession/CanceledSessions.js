import React from "react";
import { Col, Row, Card, Avatar, Empty } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";

const { Meta } = Card;

const CancelSession = ({ data = [] }) => (
  <Row gutter={[16, 16]}>
    {data.length === 0 ? (
      <Empty description="Aucune séance annulée" style={{ margin: "auto" }} />
    ) : (
      data.map((session) => (
        <Col key={uuidv4()}>
          <Card
            title={
              <Meta
                avatar={
                  <Avatar
                    style={{ color: "white", backgroundColor: "#7265e6" }}
                  >
                    {session?.creactedBy?.firstName.charAt(0)}
                  </Avatar>
                }
                title={
                  <Row justify="space-between">
                    <Col span={8}>
                      {[
                        session?.creactedBy?.firstName,
                        " ",
                        session?.creactedBy?.lastName,
                      ]}
                    </Col>
                    <Col span={8}>
                      <div
                        style={{
                          color: "gray",
                          fontWeight: "normal",
                        }}
                      >
                        <CalendarOutlined /> {session.dateSeance.slice(0, 10)}
                        <div style={{ marginBottom: 0 }}>
                          <ClockCircleOutlined />{" "}
                          {session.dateSeance.slice(11, 19)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                }
              />
            }
            style={{ width: 400, marginTop: 16 }}
          >
            <p>
              <b>Raison :</b> <span> {session?.sessionCancelled?.reason}</span>
            </p>
          </Card>
        </Col>
      ))
    )}
  </Row>
);

export default CancelSession;
