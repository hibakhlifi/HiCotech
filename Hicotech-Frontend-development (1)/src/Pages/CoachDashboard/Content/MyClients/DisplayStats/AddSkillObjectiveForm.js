import {
  Col,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import authService from "../../../../../Services/authService";
import { addObjectiveApi } from "../../../../../Services/SkillObjectiveService";
import { getAllSkillsApi } from "../../../../../Services/SkillService";

const { Option } = Select;

const AddSkillObjectiveForm = ({
  modalVisible,
  setModalVisible,
  setAlert,
  rerender,
  setRerender,
  player,
  setLoading,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      skill: undefined,
      value: undefined,
      beforeDate: moment(),
      done: undefined,
    });
    getAllSkillsApi(authService.getCurrentUser().discipline)
      .then(({ data: { skill } }) => setSkillData(skill))
      .catch(() => {
        setAlert({ type: "error", message: "erreur de serveur" });
        setTimeout(() => {
          setAlert(null);
        }, 1000);
      });
  }, []);
  const resetStatForm = () => {
    form.resetFields();
  };
  const handleCancel = () => {
    setModalVisible(!modalVisible);
    resetStatForm();
  };
  const handleOk = () => {
    form.validateFields();
  };
  const onAddSkillObjective = (values) => {
    setConfirmLoading(true);
    setLoading(true);
    addObjectiveApi({
      ...values,
      creactedBy: authService.getCurrentUser().id,
      player: player._id,
    }).then(() => {
      setAlert({
        type: "success",
        message: "compétence ajouter avec succés!",
      });
    });

    setAlert(null);
    setLoading(false);
    resetStatForm();
    setConfirmLoading(false);
    setModalVisible(false);
    setRerender(!rerender);
  };
  return (
    <Modal
      getContainer={false}
      visible={modalVisible}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      title="Ajouter une compétence à atteindre"
      okText="Ajouter"
      cancelText="Annuler"
      okButtonProps={{
        form: "add-competence-form",
        key: "ok",
        htmlType: "submit",
      }}
      onOk={handleOk}
      centered
      width={700}
    >
      <Form
        id="add-competence-form"
        layout="vertical"
        form={form}
        onFinish={onAddSkillObjective}
      >
        {/* row one */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="sélectionner compétence"
              name="skill"
              rules={[
                {
                  required: true,
                  message: "veuillez sélectionner la compétence!",
                },
              ]}
            >
              <Select
                placeholder="sélectionner la compétence"
                style={{ width: 240 }}
                allowClear
                maxTagCount="responsive"
              >
                {skillData.map((skill) => (
                  <Option key={skill._id} value={skill._id}>
                    {`${skill.skillName}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* row two */}
        <Row>
          <Col span={12}>
            <Form.Item
              label="Valeur"
              name="value"
              rules={[
                {
                  required: true,
                  message: "entrer la valeur du compétence à atteindre!",
                },
              ]}
            >
              <InputNumber
                placeholder="Valeur compétence"
                style={{ width: 240 }}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* row two */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Avant la date :"
              name="beforeDate"
              rules={[
                {
                  required: true,
                  message: "entrer la date pour atteindre ce but!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              label="atteint :"
              name="done"
              rules={[
                {
                  required: true,
                  message: "entrer la date pour atteindre ce but!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={false}>Non</Radio>
                <Radio value>Oui</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddSkillObjectiveForm;
