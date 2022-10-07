import React from "react";
import { Col, Row, Card, Avatar, Empty } from "antd";
import { v4 as uuidv4 } from "uuid";

const { Meta } = Card;

const ExpiredChallenges = ({ data = [] }) => (
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
                      <p
                        style={{
                          color: "red",
                        }}
                      >
                        Expiré
                      </p>
                    </Col>
                  </Row>
                }
              />
            }
            style={{ width: 400, marginTop: 16 }}
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

export default ExpiredChallenges;
