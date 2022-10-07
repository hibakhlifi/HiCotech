import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

const StatisticColumns = ({
  editingRow,
  setEditingRow,
  form,
  handleDelete,
  children,
}) => {
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
              name="statisticType"
              rules={[
                {
                  required: true,
                  message: "entrer le type du statistique!",
                },
              ]}
            >
              <Select defaultValue={text}>
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
                    form.setFieldsValue({
                      _id: record._id,
                      statisticName: record.statisticName,
                      statisticType: record.statisticType,
                      unit: record.unit,
                      description: record.description,
                      max: record.max,
                    });
                  }}
                  style={{ fontSize: "25px" }}
                />
              )}

              {editingRow ? (
                <Button
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  style={{ marginBottom: "28px" }}
                >
                  enregistrer
                </Button>
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
                form.setFieldsValue({
                  statisticName: record.statisticName,
                  statisticType: record.statisticType,
                  unit: record.unit,
                  description: record.description,
                  max: record.max,
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
  return <div>{(columns, children)}</div>;
};
export default StatisticColumns;
