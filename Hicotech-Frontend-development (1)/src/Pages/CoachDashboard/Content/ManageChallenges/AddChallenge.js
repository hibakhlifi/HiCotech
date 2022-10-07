import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Typography,
  Form,
  Select,
  DatePicker,
  message,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined } from "@ant-design/icons";
import authService from "../../../../Services/authService";
import userService from "../../../../Services/userService";
import ChallengeService from "../../../../Services/ChallengeService";
import assignChallengeService from "../../../../Services/assignChallengeService";

const { Option } = Select;
const { Title } = Typography;
const AddChallenge = ({ setRefrech }) => {
  const [form] = Form.useForm();
  const [playersData, setplayersData] = useState([]);
  const [challengeData, setChallengeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (authService.getCurrentUser()) {
      userService
        .getUserApi(authService.getCurrentUser().id)
        .then(({ data: { myPlayers } }) => {
          setplayersData(myPlayers);
        })
        .catch(() => {});

      ChallengeService.getChallengesApi({
        creacteBy: authService.getCurrentUser().id,
      })
        .then(({ data }) => setChallengeData(data))
        .catch(() =>
          message.error({
            content: "Erreur de serveur",
            duration: 3,
          })
        );
    }
  }, []);

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
  const onFinish = (data) => {
    if (authService.getCurrentUser()) {
      const dataToSent = {
        ...data,
        createdBy: authService.getCurrentUser().id,
      };
      setLoading(true);
      assignChallengeService
        .AssignChallengeApi(dataToSent)
        .then(() => {
          message.success({
            content: "Le défi a été envoyé",
            duration: 3,
          });
        })
        .catch(() => {
          message.error("erreur de serveur");
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
    <>
      <Title level={2}>Attribuer un défi à un joueur</Title>
      <Form
        wrapperCol={{ span: 24 }}
        form={form}
        autoComplete="off"
        layout="vertical"
        name="Attribuer_défi"
        onFinish={onFinish}
      >
        <Modal
          title="Veuillez fournir ces renseignements"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Envoyer"
          cancelText="Annuler"
          confirmLoading={loading}
        >
          <Form.Item
            label="Sélectionner les joueurs "
            name="assignedTo"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner les joueurs",
              },
            ]}
          >
            <Select
              id="playersDropdown"
              mode="multiple"
              allowClear
              maxTagCount="responsive"
              style={{ width: "100%" }}
              placeholder="Joueurs"
            >
              {playersData.map((p) => (
                <Option key={uuidv4()} value={p._id}>
                  {`${p.firstName} ${p.lastName}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Sélectionner le défi "
            name="defi"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner le défi",
              },
            ]}
          >
            <Select
              id="ChallengeDropdown"
              placeholder="Défi"
              style={{ width: "100%" }}
            >
              {challengeData.map((c) => (
                <Option key={uuidv4()} value={c._id}>
                  {c.defiName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Sélectionner la date limite "
            name="deadline"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner la date limite",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} showTime onOk={() => {}} />
          </Form.Item>
        </Modal>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          Ajouter
        </Button>
      </Form>
    </>
  );
};

export default AddChallenge;
