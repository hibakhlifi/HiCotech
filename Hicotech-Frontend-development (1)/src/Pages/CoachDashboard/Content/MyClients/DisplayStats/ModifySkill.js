import { Modal, Form, Row, Col, InputNumber, DatePicker, Radio } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { updateSkillObjectiveApi } from "../../../../../Services/SkillObjectiveService";

const ModifySkill = ({
  modalVisible,
  setModalVisible,
  dataToEdit,
  setAlert,
  setRerender,
  rerender,
}) => {
  const [, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [, setModifiedStat] = useState();
  useEffect(() => {
    form.setFieldsValue({
      value: dataToEdit.value,
      beforeDate: moment(dataToEdit.beforeDate),
      done: dataToEdit.done,
    });
    setModifiedStat({
      value: dataToEdit.value,
      beforeDate: dataToEdit.beforeDate,
      done: dataToEdit.done,
    });
  }, [dataToEdit]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 100);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setRerender(!rerender);
  };
  const onModifyStats = (values) => {
    setModifiedStat(values);
    setConfirmLoading(true);
    updateSkillObjectiveApi(dataToEdit._id, values)
      .then(() => {
        setAlert({
          type: "success",
          message: "compétence modifier avec succés!",
        });
      })
      .catch((err) => {
        if (err && err.response && err.response.data.error) {
          setAlert(err.response.data.error);
          setTimeout(() => {
            setAlert(null);
          }, 1400);
        } else {
          setAlert({ type: "error", message: "erreur de serveur" });
        }
      })
      .finally(() => {
        setModalVisible(false);
        setRerender(!rerender);
        form.resetFields();
      });
  };

  return (
    <Modal
      getContainer={false}
      visible={modalVisible}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      title="Modifier un Objective de compétence"
      okText="Modifier"
      cancelText="Annuler"
      okButtonProps={{
        form: "skill-update-form",
        key: "ok",
        htmlType: "submit",
      }}
      onOk={handleOk}
      centered
      width={700}
    >
      <Form
        id="skill-update-form"
        layout="vertical"
        form={form}
        onFinish={onModifyStats}
      >
        {/* row one */}
        <Row gutter={[16, 16]}>
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
              <InputNumber min={1} placeholder="Valeur compétence" />
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
              <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" />
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
export default ModifySkill;
