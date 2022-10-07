import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  Space,
  Modal,
  Alert,
  Form,
  Input,
  Button,
  Select,
  Tag,
  InputNumber,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  getAllStatisticsApi,
  deleteStatisticsApi,
  updateStatisticsApi,
} from "../../../../Services/StatisticService";
import StatisticFormField from "./StatisticFormField";
import authService from "../../../../Services/authService";

const { TextArea } = Input;
const MyStatistic = () => {
  const [, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statData, setStatData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alerted, setAlerted] = useState(undefined);

  const [form] = Form.useForm();

  const { Title } = Typography;
  const setAlert = (msg, duration) => {
    setAlertMessage(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, duration);
  };
  const getStatistic = () => {
    setLoading(true);
    getAllStatisticsApi(authService.getCurrentUser().discipline)
      .then((res) => res.data)
      .then(({ statistic }) => {
        setStatData(statistic);
        setLoading(false);
      })
      .then(() => setError(false))
      .catch((err) => {
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("erreur de serveur");
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    getStatistic();
  }, []);

  function handleDelete(id) {
    Modal.confirm({
      title: "êtes-vous sûr de supprimer cette statistique ?",
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",

      onOk: () => {
        setLoading(true);
        deleteStatisticsApi(id)
          .then(({ data }) => {
            setStatData((oldStats) =>
              oldStats.filter((stat) => stat._id !== data.statistique._id)
            );
            setAlert(data.message, 2000);
          })
          .catch();
        setTimeout(() => {
          setLoading(false);
        }, 700);
      },
    });
  }

  const columns = [
    {
      title: "Nom Statistique",
      dataIndex: "statisticName",
      key: "statisticName",
      render: (text, record) => {
        if (editingRow === record._id)
          return (
            <Form.Item
              name="statisticName"
              rules={[
                {
                  required: true,
                  message: "entrer le nom du statistique!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Type",
      dataIndex: "statisticType",
      key: "statisticType",
      render: (text, record) => {
        if (editingRow === record._id)
          return (
            <Form.Item
              initialValue={text}
              name="statisticType"
              rules={[
                {
                  required: true,
                  message: "entrer le type du statistique!",
                },
              ]}
            >
              <Select>
                <Select.Option value="compteur">Compteur</Select.Option>
                <Select.Option value="timer">Timer</Select.Option>
              </Select>
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Unité de mesure",
      dataIndex: "unit",
      key: "unit",
      render: (text, record) => {
        if (editingRow === record._id)
          return (
            <Form.Item
              name="unit"
              rules={[
                {
                  required: true,
                  message: "entrer l'unité du statistique!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
      render: (text, record) => {
        if (editingRow === record._id)
          return (
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "entrer la description du statistique!",
                },
              ]}
            >
              <TextArea
                placeholder="description du statistique"
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
          );
        return <p>{text}</p>;
      },
    },
    {
      title: "Alerte",
      key: "alerted",
      dataIndex: "alerted",
      render: (text, record) => {
        if (editingRow === record._id) {
          return (
            <Form.Item
              initialValue={alerted}
              name="alerted"
              rules={[
                {
                  required: true,
                  message: "indiquer s'il y'a d'alerte",
                },
              ]}
            >
              <Select
                placeholder="alerte ou pas"
                onChange={(value) => {
                  setAlerted(value);
                }}
              >
                <Select.Option value>oui</Select.Option>
                <Select.Option value={false}>non</Select.Option>
              </Select>
            </Form.Item>
          );
        }
        return <p>{text ? "oui" : "non"}</p>;
      },
    },
    {
      title: "Nature Statistique",
      key: "max",
      dataIndex: "max",
      width: "13%",
      render: (max, record) => {
        if (editingRow === record._id) {
          if (alerted) {
            return (
              <Form.Item
                initialValue={max || undefined}
                name="max"
                rules={[
                  {
                    required: true,
                    message: "selectionner la nature du statistique",
                  },
                ]}
              >
                <Select placeholder="Max/Min">
                  <Select.Option value>maximiser</Select.Option>
                  <Select.Option value={false}>minimiser</Select.Option>
                </Select>
              </Form.Item>
            );
          }
          return <p>-</p>;
        }

        if (record.alerted) {
          return (
            <Tag color={max ? "green" : "red"}>
              {max ? "maximiser" : "minimiser"}
            </Tag>
          );
        }

        return <p>-</p>;
      },
    },

    {
      title: "afficher alerte aprés",
      key: "nbreFois",
      dataIndex: "nbreFois",
      render: (nbreFois, record) => {
        if (editingRow === record._id) {
          if (alerted) {
            return (
              <Form.Item
                name="nbreFois"
                rules={[
                  {
                    required: true,
                    message: "indiquer le nombre de fois pour créé une alerte",
                  },
                ]}
              >
                <InputNumber
                  placeholder="x fois"
                  formatter={(value) => `${value}  fois`}
                  parser={(value) => value.replace("fois", "")}
                  min={1}
                />
              </Form.Item>
            );
          }
          return <p>-</p>;
        }
        return record.alerted ? <p>{`${nbreFois} fois`}</p> : <p>-</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if (editingRow === record._id)
          return (
            <>
              {!editingRow && (
                <EditOutlined
                  type="link"
                  onClick={() => {
                    setEditingRow(record._id);
                    setAlerted(record.alerted);
                    form.setFieldsValue({
                      _id: record._id,
                      statisticName: record.statisticName,
                      statisticType: record.statisticType,
                      unit: record.unit,
                      description: record.description,
                      max: record.max,
                      nbreFois: record.nbreFois,
                      alerted: record.alerted,
                    });
                  }}
                  style={{ fontSize: "25px" }}
                />
              )}

              {editingRow ? (
                <div>
                  <Button
                    type="link"
                    icon={<CheckCircleOutlined />}
                    htmlType="submit"
                    style={{ marginBottom: "10px" }}
                  />
                  <CloseCircleOutlined
                    color="red"
                    onClick={() => setEditingRow(null)}
                    style={{
                      color: "red",
                      fontSize: "16px",
                    }}
                  />
                </div>
              ) : (
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(record._id);
                  }}
                  style={{ color: "red", marginLeft: 12, fontSize: "25px" }}
                />
              )}
            </>
          );

        return (
          <>
            <EditOutlined
              onClick={() => {
                setEditingRow(record._id);
                setAlerted(record.alerted);
                form.setFieldsValue({
                  statisticName: record.statisticName,
                  statisticType: record.statisticType,
                  unit: record.unit,
                  description: record.description,
                  max: record.max,
                  nbreFois: record.nbreFois,
                  alerted: record.alerted,
                });
              }}
            />
            <DeleteOutlined
              onClick={() => {
                handleDelete(record._id);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  const onFinish = (values) => {
    const updatedDataSource = statData.map((el) => {
      if (el._id === editingRow) return { _id: editingRow, ...values };
      return { ...el };
    });
    setLoading(true);
    updateStatisticsApi(editingRow, { ...values }).then(({ data }) => {
      setEditingRow(null);
      setStatData(updatedDataSource);
      setLoading(false);
      setAlert(data.message, 2000);
    });
  };
  return (
    <>
      {showAlert && (
        <Space
          data-testid="statistic-alert"
          align="center"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Alert message={alertMessage} type="success" showIcon closable />
        </Space>
      )}
      <Title>Mes Statistiques</Title>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        style={{ marginBottom: "18px" }}
        onClick={() => setShowModal(!showModal)}
      >
        Ajouter
      </Button>
      <StatisticFormField
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        statData={statData}
        setStatData={setStatData}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
      />
      <Form form={form} onFinish={onFinish}>
        <Table
          tableLayout="fixed"
          columns={columns}
          dataSource={statData}
          loading={loading}
          pagination={{
            pageSize: 5,
          }}
          rowKey={(record) => record._id}
        />
      </Form>
    </>
  );
};

export default MyStatistic;
