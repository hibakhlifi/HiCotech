import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Form, Row, Select } from "antd";
import Title from "antd/lib/typography/Title";
import userService from "../../../../Services/userService";
import authService from "../../../../Services/authService";
import { getAllSeanceApi } from "../../../../Services/SeancesService";
import ShowSessionDetails from "./ShowSessionDetails";

const SelectSession = () => {
  const [myPlayers, setMyPlayers] = useState([]);
  const [alert, setAlert] = useState(null);
  const [playerSessions, setPlayerSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [form] = Form.useForm();

  const handleFormValuesChange = (changedValues) => {
    const formFieldName = Object.keys(changedValues)[0];
    if (formFieldName === "player") {
      form.setFieldsValue({ session: undefined });
    }
  };
  const handleSessionChange = (value) => {
    setShowDetails(false);
    setSelectedSession(value);
  };
  const handlePlayerChange = (value) => {
    setShowDetails(false);
    setPlayerSessions([]);
    getAllSeanceApi({
      creactedBy: authService.getCurrentUser().id,
      player: value,
    }).then(({ data }) => {
      setPlayerSessions(data);
    });
  };
  useEffect(() => {
    userService
      .getUserApi(authService.getCurrentUser().id)
      .then(({ data: { myPlayers } }) => {
        setMyPlayers(myPlayers);
      })
      .catch((err) => {
        if (err && err.response && err.response.data.error) {
          setAlert(err.response.data.error);
        } else {
          setAlert({ type: "error", message: "erreur de serveur" });
        }
      });
  }, []);
  return (
    <>
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
      <Title>Détails séance</Title>
      <Form
        form={form}
        onValuesChange={handleFormValuesChange}
        onFinish={() => setShowDetails(true)}
        layout="vertical"
        style={{
          backgroundColor: "#f6f6f6",
          paddingTop: "11px",
          borderRadius: "8px",
          background: "#fbfbfb",
          border: "1px solid #d9d9d9",
          marginBottom: "40px",
        }}
      >
        <Row>
          <Col span={8} offset={1}>
            <Form.Item
              name="player"
              label="Sélectionner joueur :"
              rules={[
                {
                  required: true,
                  message: "Sélectionner le joueur",
                },
              ]}
            >
              <Select
                placeholder="Sélectionner joueur"
                style={{ width: 200 }}
                allowClear
                onChange={handlePlayerChange}
                onClear={() => {
                  form.resetFields();
                  setPlayerSessions([]);
                }}
              >
                {myPlayers.map((el) => (
                  <Select.Option value={el._id}>
                    {`${el.firstName} ${el.lastName}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="session"
              label="Sélectionner séance :"
              rules={[
                {
                  required: true,
                  message: "Sélectionner la séance",
                },
              ]}
            >
              <Select
                placeholder="Sélectionner séance"
                style={{ width: 200 }}
                allowClear
                onChange={handleSessionChange}
              >
                {playerSessions.map((el) => (
                  <Select.Option value={el._id}>{el.seanceName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                style={{ marginTop: "30px" }}
                type="primary"
                className="login-form-button"
                icon={<SearchOutlined />}
                htmlType="submit"
              >
                Chercher
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {selectedSession && showDetails && (
        <ShowSessionDetails SessionId={selectedSession} />
      )}
    </>
  );
};

export default SelectSession;
