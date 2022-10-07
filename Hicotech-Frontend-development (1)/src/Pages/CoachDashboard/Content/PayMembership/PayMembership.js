import { useEffect, useState } from "react";
import { Radio, Form, Button, Spin, Row, Col, Alert } from "antd";
import Title from "antd/lib/typography/Title";
import "./PayMembership.css";
import { updateMembership } from "../../../../Services/membershipService";
import userService from "../../../../Services/userService";
import authService from "../../../../Services/authService";

const PayMembership = () => {
  const [form] = Form.useForm();
  const [, setSubscriptionData] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const fetchMembership = () => {
    setLoading(true);
    userService
      .getUserApi(authService.getCurrentUser().id)
      .then(({ data: { subscription } }) => {
        setSubscriptionData(subscription);
        form.setFieldsValue({
          subscription,
        });
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchMembership();
  }, []);
  const handleSubmit = (subscriptionValue) => {
    setLoading(true);
    updateMembership(authService.getCurrentUser().id, subscriptionValue)
      .then(({ data: { message, type, data } }) => {
        setAlert({ message, type });
        setSubscriptionData(data.subscription);
        setTimeout(() => {
          setAlert(null);
          setLoading(false);
        }, 1000);
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
  };

  return (
    <>
      <Title>Payer Abonnement</Title>
      {alert && (
        <Row data-testid="subscription-alert" justify="center">
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
      <Title level={4}>Sélectionner le type d'abonnement :</Title>
      <Spin spinning={loading}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="subscription"
            rules={[
              {
                required: true,
                message: "sélectionner le type abonnement",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                setSubscriptionData(e.target.value);
              }}
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button className="radioItem" value="Free">
                Free
              </Radio.Button>
              <Radio.Button className="radioItem" value="Basic">
                Basic
              </Radio.Button>
              <Radio.Button className="radioItem" value="Premium">
                Premium
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enregistrer
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default PayMembership;
