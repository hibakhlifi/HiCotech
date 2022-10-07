import { useState } from "react";
import { Modal, Button, Typography, Form, Select, Input, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { EnvironmentOutlined, PlusOutlined } from "@ant-design/icons";
import Location from "../../../../Components/Map";
import gouvernorats from "../../../../utils/gouvernorats";
import auth from "../../../../Services/authService";
import trainingGround from "../../../../Services/trainingGround";
import "./TrainingGround.css";

const { Option } = Select;
const { Title } = Typography;
const AddTrainingGround = ({ setRefrech }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const onFinish = (userinputs) => {
    const { city, address, coordinates } = userinputs;
    if (auth.getCurrentUser()) {
      const data = {
        city,
        address,
        coordinates,
        createdBy: auth.getCurrentUser().id,
      };
      setLoading(true);
      trainingGround
        .addTrainingGroudApi(data)
        .then(({ data }) => {
          message.success({
            content: data.message,
            duration: 3,
          });
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
          setIsModalVisible(false);
          setLoading(false);
          setRefrech((prev) => prev + 1);
          form.resetFields();
        });
    }
  };

  return (
    <div className="addTrainingGround">
      <Title level={2}>Gérer lieu d`entrainement</Title>
      <Form
        wrapperCol={{ span: 24 }}
        form={form}
        autoComplete="off"
        layout="vertical"
        name="Ajouter_lieu_entainement"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Modal
          title="Veuillez sélectionner l'emplacement."
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Confirmer"
          cancelText="Annuler"
          confirmLoading={loading}
        >
          <Form.Item
            name="city"
            label="gouvernorat"
            rules={[
              {
                required: true,
                message: "gouvernorat est requis",
              },
            ]}
          >
            <Select placeholder="gouvernorat">
              {gouvernorats.map((gouvernorat) => (
                <Option key={uuidv4()} value={gouvernorat}>
                  {gouvernorat}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Lieu"
            name="address"
            rules={[
              {
                required: true,
                message: "lieu d'entrainement est requis",
              },
            ]}
          >
            <Input placeholder="lieu d'entrainement" />
          </Form.Item>
          <Form.Item
            label="Préciser lieu"
            name="coordinates"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Location
              visible={openMap}
              form={form}
              setvisibility={setOpenMap}
            />
            <Button
              onClick={() => {
                setOpenMap(true);
              }}
              icon={<EnvironmentOutlined />}
            >
              Ouvrir la carte
            </Button>
          </Form.Item>
        </Modal>
        <Button
          data-testid="AddTrainingGroundId"
          type="primary"
          onClick={showModal}
          icon={<PlusOutlined />}
        >
          Ajouter
        </Button>
      </Form>
    </div>
  );
};

export default AddTrainingGround;
