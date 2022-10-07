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
  Switch,
} from "antd";
import {
  ClockCircleOutlined,
  MessageOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import authService from "../../../../Services/authService";
import { updateSeanceApi } from "../../../../Services/SeancesService";

const { Meta } = Card;
const { TextArea } = Input;
const SessionsCards = ({ data = [], setRefetch }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(undefined);

  const updateSession = (userInputsData) => {
    if (authService.getCurrentUser()) {
      setLoading(true);
      updateSeanceApi(selectedSessionId, {
        feedback: userInputsData,
      })
        .then(() => {
          message.success({
            content: "Votre feedback a été enregistré avec succès",
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
          name="annuler séance"
          onFinish={updateSession}
          initialValues={{
            goalAcheived: true,
          }}
        >
          <Form.Item
            label="L'objectif global de la séance est atteint :"
            name="goalAcheived"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Veuillez préciser si l’objectif a été atteint",
              },
            ]}
          >
            <Switch
              checkedChildren="Oui"
              unCheckedChildren="Non"
              defaultChecked
            />
          </Form.Item>
          <Form.Item
            label="Description : "
            name="description"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Veuillez préciser la raison :",
              },
            ]}
          >
            <TextArea
              data-testid="FeedBackDescription"
              placeholder="donnez une description"
              autoSize={{ minRows: 3, maxRows: 3 }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Row gutter={[16, 16]}>
        {data.length === 0 ? (
          <Empty
            description="Aucune séance trouvée"
            style={{ margin: "auto", marginTop: 50 }}
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
                        {session?.creactedBy?.firstName?.charAt(0)}
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
                    style={{ width: "100%" }}
                    onClick={() => {
                      setSelectedSessionId(session._id);
                      setIsModalVisible(true);
                    }}
                  >
                    <MessageOutlined />
                    Votre feedback
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

export default SessionsCards;
