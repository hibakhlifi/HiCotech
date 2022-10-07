import React, { useState, useEffect } from "react";
import { Card, Radio, Modal, Form, Skeleton, Button, Alert } from "antd";
import { v4 as uuidv4 } from "uuid";
import disciplineService from "../../../../Services/disciplineService";
import userService from "../../../../Services/userService";
import authService from "../../../../Services/authService";
import useLocalStorage from "../../../../Hooks/useLocalStorage";

const SelectDescipline = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [disciplines, setDisciplines] = useState([]);
  const [, setToken] = useLocalStorage();
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    setLoading(true);
    disciplineService
      .getDisciplinesApi()
      .then(({ data }) => {
        setDisciplines(data);
      })
      .catch(() => {
        setAlert({ type: "error", message: "erreur de serveur" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOk = () => {
    if (disciplines.length !== 0) {
      form
        .validateFields()
        .then(() => {
          form.submit();
        })
        .catch(() => {});
    }
  };

  const onFinish = async (userInput) => {
    await userService
      .updateUserApi(authService.getCurrentUser().id, userInput)
      .then(({ data }) => {
        setToken(data.token);
        setSubmitting(true);
      })
      .catch(() => {
        setAlert({ type: "error", message: "erreur de serveur" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Modal
      title="Sélectionner votre discipline"
      visible={!submitting}
      onOk={handleOk}
      onCancel={() => {}}
      confirmLoading={submitting}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleOk}
        >
          Confirmer
        </Button>,
      ]}
    >
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          showIcon
          closable
          banner
        />
      )}

      {loading ? (
        <>
          <Skeleton.Button active size="large" shape="square" block />
          <Skeleton.Button active size="large" shape="square" block />
          <Skeleton.Button active size="large" shape="square" block />
          <Skeleton.Button active size="large" shape="square" block />
          <Skeleton.Button active size="large" shape="square" block />
        </>
      ) : (
        disciplines.length !== 0 && (
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="discipline"
              rules={[
                {
                  required: true,
                  message: "descipline est requis",
                },
              ]}
            >
              <Radio.Group size="large" buttonStyle="solid">
                {disciplines.map((desc) => (
                  <Card.Grid key={uuidv4()} style={{ padding: "0px" }}>
                    <Radio.Button
                      style={{
                        height: "100%",
                        width: "100%",
                        textAlign: "center",
                        padding: 15,
                        display: "flex",
                        flexDirection: "column",
                      }}
                      value={desc._id}
                    >
                      <div
                        style={{
                          alignContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          fontWeight: "600",
                          fontSize: "1.2em",
                        }}
                      >
                        <ion-icon
                          style={{ margin: "auto" }}
                          size="large"
                          name={desc.icon}
                        />
                        {desc.label}
                      </div>
                    </Radio.Button>
                  </Card.Grid>
                ))}
              </Radio.Group>
            </Form.Item>
          </Form>
        )
      )}
    </Modal>
  );
};

export default SelectDescipline;
