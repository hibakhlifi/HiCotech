import React, { useState } from "react";
import {
  Col,
  Row,
  Card,
  Avatar,
  Button,
  Empty,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import {
  ClockCircleOutlined,
  CloseOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import authService from "../../../../Services/authService";
import { annulerSeanceApi } from "../../../../Services/SeancesService";

const { Meta } = Card;
const { TextArea } = Input;
const ToCancelSessions = ({ data = [], setRefetch }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(undefined);

  const markCancelled = (userInput) => {
    if (authService.getCurrentUser()) {
      setLoading(true);
      annulerSeanceApi(selectedSessionId, {
        sessionCancelled: {
          isCancelled: true,
          reason: userInput.reason,
        },
      })
        .then(() => {
          message.success({
            content: "La séance a été annulée avec succès",
            duration: 2,
          });
          setRefetch((prev) => prev + 1);
        })
        .catch(() => {
          message.error({
            content: "Erreur de serveur",
            duration: 3,
          });
        })
        .finally(setLoading(false));
    }
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  return (
    <>
      <Modal
        title="Veuillez fournir ces renseignements"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirmer"
        cancelText="Annuler"
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          name="annuler séance"
          onFinish={markCancelled}
        >
          <Form.Item
            label="Préciser la raison :"
            name="reason"
            rules={[
              {
                required: true,
                message: "Veuillez préciser la raison",
              },
            ]}
          >
            <TextArea
              data-testid="cancelSessionTextArea"
              placeholder="raison de l'annulation"
              autoSize={{ minRows: 2, maxRows: 3 }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Row gutter={[16, 16]}>
        {data.length === 0 ? (
          <Empty
            description="Aucune séance à annuler"
            style={{ margin: "auto" }}
          />
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
                            <CalendarOutlined />{" "}
                            {session.dateSeance.slice(0, 10)}
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
                style={{ width: 410, marginTop: 16 }}
                actions={[
                  <Button
                    className="redHoverColor"
                    style={{ width: "100%", color: "red" }}
                    onClick={() => {
                      setSelectedSessionId(session._id);
                      setIsModalVisible(true);
                    }}
                  >
                    <CloseOutlined twoToneColor="red" />
                    Anuuler
                  </Button>,
                ]}
              >
                <p>
                  <b>Séance :</b> <span> {session?.seanceName || "N/A"}</span>
                </p>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default ToCancelSessions;
