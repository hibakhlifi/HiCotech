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
import { addObjectiveApi } from "../../../../../Services/StatisticObjectiveService";
import { getAllStatisticsApi } from "../../../../../Services/StatisticService";

const { Option } = Select;

const AddStatObjectiveForm = ({
  modalVisible,
  setModalVisible,
  setAlert,
  rerender,
  setRerender,
  setLoading,
  player,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [statData, setStatData] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      statistic: undefined,
      value: undefined,
      beforeDate: moment(),
      done: undefined,
    });
    getAllStatisticsApi(authService.getCurrentUser().discipline)
      .then(({ data: { statistic } }) => setStatData(statistic))
      .catch(() => {
        setAlert({ type: "error", message: "erreur de serveur" });
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
  const onAddStatObjective = (values) => {
    setConfirmLoading(true);
    setLoading(true);
    addObjectiveApi({
      ...values,
      creactedBy: authService.getCurrentUser().id,
      player: player._id,
    }).then(() => {
      setAlert({
        type: "success",
        message: "statistique ajouter avec succés!",
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
      title="Ajouter une statistique à atteindre"
      okText="Ajouter"
      cancelText="Annuler"
      okButtonProps={{
        form: "add-statistic-form",
        key: "ok",
        htmlType: "submit",
      }}
      onOk={handleOk}
      centered
      width={700}
    >
      <Form
        id="add-statistic-form"
        layout="vertical"
        form={form}
        onFinish={onAddStatObjective}
      >
        {/* row one */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="sélectionner statistisque"
              name="statistic"
              rules={[
                {
                  required: true,
                  message: "veuillez sélectionner la satistique!",
                },
              ]}
            >
              <Select
                placeholder="sélectionner la statistique"
                style={{ width: 240 }}
                allowClear
                maxTagCount="responsive"
              >
                {statData.map((stat) => (
                  <Option key={stat._id} value={stat._id}>
                    {`${stat.statisticName}`}
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
                  message: "entrer la valeur du statistique à atteindre!",
                },
              ]}
            >
              <InputNumber
                placeholder="Valeur statistique"
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

export default AddStatObjectiveForm;
