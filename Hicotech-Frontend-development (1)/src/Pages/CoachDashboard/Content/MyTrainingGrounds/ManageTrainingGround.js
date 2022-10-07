import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button, Select, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  EnvironmentOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import trainingGround from "../../../../Services/trainingGround";
import gouvernorats from "../../../../utils/gouvernorats";
import authService from "../../../../Services/authService";
import Location from "../../../../Components/Map";
import AddTrainingGround from "./AddTrainingGround";
import "./TrainingGround.css";

const ManageTrainingGround = () => {
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const [editing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (authService.getCurrentUser()) {
      setLoading(true);
      trainingGround
        .getTrainingGroudsApi(authService.getCurrentUser().id)
        .then(({ data }) => {
          setDataSource(() => data.data);
        })
        .catch((err) => {
          if (err && err.response && err.response.data.error) {
            message.error({
              content: err.response.data.error.message,
              duration: 3,
            });
          } else {
            message.error({
              content: "Erreur de serveur",
              duration: 3,
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [refetch]);
  const onFinish = (userinputs) => {
    setLoading(true);
    const data = { ...userinputs, createdBy: authService.getCurrentUser().id };
    trainingGround
      .updateTrainingGroudApi(rowToEdit, data)
      .then(({ data }) => {
        message.success({
          content: data.message,
          duration: 3,
        });
        setRowToEdit(null);
        setIsEditing(false);
        setRefetch((prev) => prev + 1);
      })
      .catch((err) => {
        if (err && err.response && err.response.data.error) {
          message.error({
            content: err.response.data.error.message,
            duration: 3,
          });
        } else {
          message.error({
            content: "Erreur de serveur",
            duration: 3,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "êtes-vous sûr de supprimer ce lieu ?",
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",

      onOk: () => {
        setLoading(true);
        trainingGround
          .deleteTrainingGroudApi(id)
          .then(({ data }) => {
            message.success({
              content: data.message,
              duration: 3,
            });
            setRefetch((prev) => prev + 1);
          })
          .catch((err) => {
            if (err && err.response && err.response.data.error) {
              message.error({
                content: err.response.data.error.message,
                duration: 3,
              });
            } else {
              message.error({
                content: "Erreur de serveur",
                duration: 3,
              });
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };
  const columns = [
    {
      title: "Gouvernaurat",
      dataIndex: "city",
      key: uuidv4(),
      render: (text, record) => {
        if (rowToEdit === record._id)
          return (
            <Form.Item
              initialValue={text}
              name="city"
              rules={[
                {
                  required: true,
                  message: "gouvernaurats est requis",
                },
              ]}
            >
              <Select id="gouvernaurat">
                {gouvernorats.map((gouvernorat) => (
                  <Select.Option key={uuidv4()} value={gouvernorat}>
                    {gouvernorat}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Lieu d'entrainement",
      dataIndex: "address",
      key: uuidv4(),
      render: (text, record) => {
        if (rowToEdit === record._id)
          return (
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "lieu d'entrainement est requis",
                },
              ]}
            >
              <Input
                id="adresse"
                defaultValue={text}
                placeholder="lieu d'entrainement"
              />
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Localisation",
      dataIndex: "coordinates",
      key: uuidv4(),
      render: (text, record) => {
        if (rowToEdit === record._id)
          return (
            <Form.Item
              name="coordinates"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Button
                onClick={() => setIsModalVisible(true)}
                icon={<EnvironmentOutlined />}
              >
                Ouvrir la carte
              </Button>

              <Location
                form={form}
                initialPosition={form.getFieldValue("coordinates")}
                visible={isModalVisible}
                setvisibility={setIsModalVisible}
              />
            </Form.Item>
          );
        return (
          <Button disabled icon={<EnvironmentOutlined />}>
            Ouvrir la carte
          </Button>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "12%",
      render: (_, record) => {
        if (rowToEdit === record._id) {
          return (
            <>
              <Button
                data-testid="CancelTrainingGroundupdate"
                danger
                shape="circle"
                className="redHoverColor"
                icon={<CloseOutlined />}
                onClick={() => {
                  setRowToEdit(null);
                  setIsEditing(false);
                }}
                style={{
                  marginRight: "10px",
                }}
              />
              <Button
                data-testid="validateTrainingGroundUpdate"
                type="link"
                shape="circle"
                icon={<CheckOutlined />}
                htmlType="submit"
                style={{ color: "green", borderColor: "green" }}
              />
            </>
          );
        }
        return (
          <>
            <Button
              data-testid="updateTrainingGroundBtn"
              type="primary"
              ghost
              shape="circle"
              disabled={editing}
              icon={<EditOutlined />}
              onClick={() => {
                form.setFieldsValue(record);
                setRowToEdit(record._id);
                setIsEditing(true);
              }}
            />
            <Button
              data-testid="deleteTrainingGroundBtn"
              danger
              shape="circle"
              className="redHoverColor"
              disabled={editing}
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDelete(record._id);
              }}
              style={{ marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <AddTrainingGround setRefrech={setRefetch} />
      <Form form={form} onFinish={onFinish}>
        <Table
          tableLayout="fixed"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={(record) => record._id}
          pagination={{
            pageSize: 5,
          }}
        />
      </Form>
    </>
  );
};

export default ManageTrainingGround;
