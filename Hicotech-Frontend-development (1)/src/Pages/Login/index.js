import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import auth from "../../Services/authService";
import "./Login.css";
import Logo from "../../Assets/logo.svg";
import useLocalStorage from "../../Hooks/useLocalStorage";

const Login = ({ location }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorage("token", null);
  const login = async (data) => {
    setLoading(true);
    auth
      .loginUserApi(data)
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
          : currentUser.role && currentUser.role === "coach"
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
          <img src={Logo} height={130} width={130} alt="" />
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
            <NavLink exact to="/register">
              {" "}
              Inscrivez-vous!
            </NavLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
