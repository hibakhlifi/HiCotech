import { InfoCircleOutlined } from "@ant-design/icons";
import { Spin, Col, Form, Input, Row, Rate, Skeleton, Tooltip } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";

const DisplayInfo = () => {
  const [loading] = useState(false);
  const [skeleton] = useState(false);

  return !skeleton ? (
    <Spin spinning={loading}>
      <Form
        layout="horizontal"
        style={{
          backgroundColor: "#f6f6f6",
          paddingTop: "20px",
          marginTop: "20px",
          minHeight: "30px",
          borderRadius: "8px",
        }}
      >
        <Row>
          <Col span={24} offset={1}>
            <Title level={4}>Les Statistiques :</Title>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item label="course :">
              <Input
                prefix={
                  <Tooltip title="Ceci permet de mesurer la vitesse d'un joueur">
                    <InfoCircleOutlined
                      style={{ color: "rgba(0,0,0,.45)", marginRight: "8px" }}
                    />
                  </Tooltip>
                }
                suffix="métre"
                value="valeur de backend"
              />
            </Form.Item>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item label="vitesse :">
              <Input
                prefix={
                  <Tooltip title="Ceci permet de mesurer la vitesse d'un joueur">
                    <InfoCircleOutlined
                      style={{ color: "rgba(0,0,0,.45)", marginRight: "8px" }}
                    />
                  </Tooltip>
                }
                suffix="KM/h"
                value="valeur de backend"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Form
        layout="horizontal"
        style={{
          backgroundColor: "#f6f6f6",
          paddingTop: "20px",
          marginTop: "20px",
          minHeight: "30px",
          borderRadius: "8px",
        }}
      >
        <Row>
          <Col span={24} offset={1}>
            <Title level={4}>Les Compétences :</Title>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item label="course :">
              <Rate allowHalf defaultValue={2.5} value={2.5} />
            </Form.Item>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item label="vitesse :">
              <Rate allowHalf defaultValue={4} value={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  ) : (
    <Skeleton
      active
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        marginTop: "20px",
        minHeight: "250px",
        borderRadius: "8px",
      }}
    />
  );
};

export default DisplayInfo;
