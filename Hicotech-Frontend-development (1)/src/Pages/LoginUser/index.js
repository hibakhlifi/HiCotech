import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import auth from "../../Services/authService";
import "./Login.css";
import Logo from "../../Assets/logo.svg";
import useLocalStorage from "../../Hooks/useLocalStorage";
import axios from "axios";
const LoginUser = ({ location }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorage("token", null);
  const login = async (data) => {
    setLoading(true);
    auth
      .loginPlayerApi(data)
      .then(({ data }) => {
        setToken(data.token);
      })
      .catch((err) => {
        setToken(null);
        if (err?.response?.data?.error) {
          message.error({
            content: err.response.data.error,
            duration: 3,
          });
        } else {
          message.error({
            content: "Erreur de serveur",
            duration: 3,
          });
        }
      })
      .finally(() => setLoading(false));
  };
  const onFinish = (data) => {
    login(data);
  };
  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      history.push(
        location.state
          ? location.state.from.pathname
          : currentUser.role && currentUser.role === "joueur"
          ? "/coach/dashboard"
          : "/joueur/dashboard"
      );
    }
  }, [token]);
  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <br />
        <div className="logo-center">
          <img src="data:image/jpeg;base64,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" height={130} width={130} alt="" />
        </div>
        <Form.Item
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
            data-testid="emailInput"
            size="large"
            prefix={
              <MailOutlined
                className="site-form-item-icon"
                style={{ marginRight: "5px" }}
              />
            }
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "mot de passe est requis",
            },
            {
              min: 6,
              message: "mot de passe doit comporter au moins 6 caractères",
            },
          ]}
        >
          <Input.Password
            data-testid="PasswordInput"
            size="large"
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ marginRight: "5px" }}
              />
            }
            type="password"
            placeholder="mot de passe"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          <div style={{ marginTop: "5px" }}>
            Ou
            <NavLink exact to="/registerUser">
              {" "}
              Inscrivez-vous!
            </NavLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginUser;
