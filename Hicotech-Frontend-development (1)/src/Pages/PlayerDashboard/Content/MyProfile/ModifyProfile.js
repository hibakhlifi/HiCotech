import {
  ColumnHeightOutlined,
  DashboardOutlined,
  MailOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
} from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import React, { useEffect, useState } from "react";
import authService from "../../../../Services/authService";
import userService from "../../../../Services/userService";
import gouvernorats from "../../../../utils/gouvernorats";

const ModifyProfile = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    setLoading(true);
    userService.getUserApi(authService.getCurrentUser().id).then(({ data }) => {
      setUser(data);
      form.setFieldsValue({
        firstName: data.firstName,
        lastName: data.lastName,
        sexe: data.sexe,
        dateOfBirth: moment(data.dateOfBirth),
        email: data.email,
        height: data.height,
        weight: data.weight,
        city: data.city,
      });
    });
    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, []);
  return (
    <>
      <Title style={{ marginBottom: "100px" }}>Modifier Profile</Title>
      {alert && (
        <Row style={{ margin: "30px" }} justify="center">
          <Col>
            <Alert message={alert.message} type={alert.type} showIcon />
          </Col>
        </Row>
      )}

      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          name="updatePlayerProfile"
          onFinish={(values) => {
            setLoading(true);
            setTimeout(() => {
              userService
                .updateUserApi(user._id, values)
                .then(() => {
                  setAlert({
                    message: "l'utilisateur a été mis à jour avec succès",
                    type: "success",
                  });
                  setUser({ ...user, ...values });
                  setTimeout(() => {
                    setAlert(null);
                  }, 2000);
                })
                .catch((err) => {
                  if (err && err.response && err.response.data.error) {
                    setAlert(err.response.data.error);
                    setLoading(false);
                  } else {
                    setAlert({ type: "error", message: "erreur de serveur" });
                    setLoading(false);
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            }, 1000);
          }}
        >
          <Row
            gutter={[16, 16]}
            style={{
              backgroundColor: "#fcfcfc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col span={9}>
              <Form.Item
                label="Nom joueur"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "entrer le nom du joueur!",
                  },
                ]}
              >
                <Input
                  placeholder="Entrer le nom du joueur"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="Prénom joueur"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "entrer le prénom du joueur!",
                  },
                ]}
              >
                <Input
                  placeholder="default size"
                  prefix={<SolutionOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="sexe :"
                name="sexe"
                rules={[
                  {
                    required: true,
                    message: "sexe est requis",
                  },
                ]}
              >
                <Select placeholder="sexe du joueur">
                  <Select.Option value="Homme">Homme</Select.Option>
                  <Select.Option value="Femme">Femme</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="date de naissance :"
                name="dateOfBirth"
                rules={[
                  {
                    type: "object",
                    required: true,
                    message: "date de naissance est requis",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="date de naissance"
                  style={{ display: "flex" }}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="email :"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "email est requis",
                  },
                  {
                    type: "email",
                    message: "email n'est pas valide",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="entrer l'email du joueur"
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="gouvernorat :"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "gouvernorat est requis",
                  },
                ]}
              >
                <Select placeholder="gouvernorat">
                  {gouvernorats.map((gouvernorat) => (
                    <Select.Option value={gouvernorat}>
                      {gouvernorat}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="Hauteur"
                name="height"
                rules={[
                  {
                    required: true,
                    message: "entrer la hauteur du joueur!",
                  },
                ]}
              >
                <InputNumber
                  placeholder=" Poids du joueur  "
                  style={{ width: "600px" }}
                  prefix={<ColumnHeightOutlined />}
                  addonAfter="m"
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="poids"
                name="weight"
                rules={[
                  {
                    required: true,
                    message: "entrer le poids du joueur!",
                  },
                ]}
              >
                <InputNumber
                  placeholder=" Poids du joueur  "
                  style={{ width: "600px" }}
                  prefix={<DashboardOutlined />}
                  addonAfter="Kg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center" gutter={[16, 16]}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                Enregistrer
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Spin>
    </>
  );
};

export default ModifyProfile;
