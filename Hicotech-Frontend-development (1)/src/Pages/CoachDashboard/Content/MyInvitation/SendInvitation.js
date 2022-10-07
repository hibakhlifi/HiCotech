import React from "react";
import { Modal, Form, Input, DatePicker } from "antd";
import { addInvitationApi } from "../../../../Services/InvitationService";
import authService from "../../../../Services/authService";
import notificationComponent from "../../../../Components/NotificationComponent";

const SendInvitation = (props) => {
  const [form] = Form.useForm();
  const {
    setIsModalVisible,
    isModalVisible,
    invitations,
    setInvitations,
    setLoading,
  } = props;

  const handleOk = (values) => {
    const currentUser = authService.getCurrentUser();

    const invitation = {
      email: values.email,
      dateExpiration: values.dateExpiration,
      creacteBy: currentUser.id,
      etat: "envoyé",
      userData: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      },
    };
    setLoading(false);
    addInvitationApi(invitation).then((response) => {
      const { data } = response;
      invitations.unshift(data);
      setInvitations(invitations);
      notificationComponent("Notification", "invitation envoye ");
      setLoading(true);
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      title="Send Invitation"
      okText="Create"
      cancelText="Cancel"
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
        initialValues={{}}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "email est requis",
            },
            {
              type: "email",
              message: "email n'est pas valide",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Nom "
          name="firstName"
          rules={[
            {
              required: true,
              message: "nom est requis",
            },
          ]}
        >
          <Input placeholder="Nom" />
        </Form.Item>
        <Form.Item
          label="Prénom"
          name="lastName"
          rules={[
            {
              required: true,
              message: "prénom est requis",
            },
          ]}
        >
          <Input placeholder="Prénom" />
        </Form.Item>
        <Form.Item
          label="Date d'experation "
          name="dateExpiration"
          rules={[
            {
              required: true,
              message: "date d'experation est requis",
            },
          ]}
        >
          <DatePicker
            format="YYYY/MM/DD"
            placeholder="Date d'experation"
            style={{ display: "flex" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SendInvitation;
