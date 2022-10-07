import React from "react";
import { Modal, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { addDefiApi, updateDefiApi } from "../../../../Services/defiService";
import authService from "../../../../Services/authService";
import notificationComponent from "../../../../Components/NotificationComponent";

const dateFormat = "YYYY/MM/DD";

const DefiForm = (props) => {
  const [form] = Form.useForm();
  const {
    setIsModalVisible,
    isModalVisible,
    setDefis,
    defis,
    setLoading,
    defiSelected,
  } = props;

  const modalTitle =
    defiSelected._id === "0000" ? "Ajouter un défi" : "Modifier un defi ";
  const modalBtnText = defiSelected._id === "0000" ? "Créer" : "Modifier";
  const worker = moment(defiSelected.dateExpiration);
  const handleOk = (values) => {
    const currentUser = authService.getCurrentUser();
    const defi = {
      ...values,
      creacteBy: currentUser.id,
    };
    setLoading(false);
    if (defiSelected._id === "0000") {
      addDefiApi(defi).then((response) => {
        setDefis([...defis, response.data]);
        notificationComponent("Notification", "défi est ajouté avec succes ");
        setLoading(true);
      });
    } else {
      updateDefiApi(defiSelected._id, defi).then((res) => {
        const { data } = res;
        const newDefis = defis.map((defiItem) => {
          if (defiItem._id === defiSelected._id) {
            return data;
          }

          return defiItem;
        });

        setDefis(newDefis);
        setLoading(true);
        notificationComponent("Notification", "Modification avec succés ");
      });
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      visible={isModalVisible}
      title={modalTitle}
      okText={modalBtnText}
      cancelText="Annuler"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleOk(values);
          })
          .catch(() => {});
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          _id: defiSelected ? defiSelected._id : null,
          defiName: defiSelected ? defiSelected.defiName : "",
          defiObjectif: defiSelected ? defiSelected.defiObjectif : "",
          defiLien: defiSelected ? defiSelected.defiLien : "",
          dateExpiration: worker,
        }}
      >
        <Form.Item
          label="Nom "
          name="defiName"
          rules={[
            {
              required: true,
              message: "Ce champs est requis",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Objectif "
          name="defiObjectif"
          rules={[
            {
              required: true,
              message: "Ce champs est requis",
            },
          ]}
        >
          <Input placeholder="Le but ..." />
        </Form.Item>
        <Form.Item
          label="Lien Vidéo "
          name="defiLien"
          rules={[
            {
              required: true,
              message: "Ce champs est requis",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date d'éxpiration "
          name="dateExpiration"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <DatePicker format={dateFormat} style={{ display: "flex" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default DefiForm;
