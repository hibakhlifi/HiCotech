import {
  ColumnHeightOutlined,
  DashboardOutlined,
  DollarOutlined,
  MailOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
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
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import gouvernorats from "../../../../../utils/gouvernorats";
import userService from "../../../../../Services/userService";

const UpdatePlayerProfile = ({ user, setAlert, setPlayer }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [playerData, setPLayerData] = useState(user);
  useEffect(() => {
    form.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      sexe: user.sexe,
      dateOfBirth: moment(user.dateOfBirth),
      email: user.email,
      city: user.city,
      active: user.active,
      height: user.height,
      weight: user.weight,
      sessionPrice: user.sessionPrice,
    });
    setPLayerData(user);
  }, [user]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        name="modify-player"
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
                setPlayer({ ...playerData, ...values });
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
          }, 750);
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
              initialValue={playerData.firstName}
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
              initialValue={playerData.lastName}
              label="Prénom joueur"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "entrer le prénom du joueur!",
                },
              ]}
            >
              <Input placeholder="default size" prefix={<SolutionOutlined />} />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              initialValue={playerData.sexe}
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
              initialValue={moment(playerData.dateOfBirth)}
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
              initialValue={playerData.email}
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
              initialValue={playerData.city}
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
                  <Select.Option key={uuidv4()} value={gouvernorat}>
                    {gouvernorat}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Hauteur"
              initialValue={playerData.height}
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
              initialValue={playerData.weight}
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
          <Col span={8}>
            <Form.Item
              label="active"
              initialValue={playerData.active}
              name="active"
              rules={[
                {
                  required: true,
                  message: "entrer le status du joueur!",
                },
              ]}
            >
              <Select placeholder="status du joueur">
                <Select.Option value>Active</Select.Option>
                <Select.Option value={false}>Pas active</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Prix d'une séance"
              initialValue={playerData.sessionPrice}
              name="sessionPrice"
              rules={[
                {
                  required: true,
                  message: "entrer le prix d'une séance!",
                },
              ]}
            >
              <InputNumber
                placeholder=" Prix d'une séance  "
                style={{ width: "600px" }}
                prefix={<DollarOutlined />}
                addonAfter="TND"
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
  );
};

export default UpdatePlayerProfile;
