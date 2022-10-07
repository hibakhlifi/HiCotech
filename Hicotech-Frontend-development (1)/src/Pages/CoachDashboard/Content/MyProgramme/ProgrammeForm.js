import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  addProgrammeApi,
  updateProgrammeApi,
} from "../../../../Services/ProgrammeService";
import authService from "../../../../Services/authService";
import notificationComponent from "../../../../Components/NotificationComponent";

const ProgrammeForm = (props) => {
  const [form] = Form.useForm();
  const {
    setIsModalVisible,
    isModalVisible,
    setProgrammes,
    programmes,
    setLoading,
    programmeSelected,
  } = props;
  const modalTitle =
    programmeSelected._id === "0000"
      ? "Creer un programme"
      : "Modifier un programme ";
  const modalBtnText = programmeSelected._id === "0000" ? "Creer" : "Modifier";

  const handleOk = (values) => {
    const currentUser = authService.getCurrentUser();
    const imageDATA =
      values.image === undefined ? "" : values.image.fileList[0].thumbUrl;
    const programme = {
      ...values,
      image: imageDATA,
      creacteBy: currentUser.id,
    };
    setLoading(false);
    if (programmeSelected._id === "0000") {
      addProgrammeApi(programme).then((response) => {
        const { data } = response;
        programmes.unshift(data);
        setProgrammes(programmes);
        notificationComponent("Notification", "Programme ajoute ");
        setLoading(true);
      });
    } else {
      updateProgrammeApi(programmeSelected._id, programme).then((res) => {
        const { data } = res;
        const newProgrammes = programmes.map((programmeItem) => {
          if (programmeItem._id === programmeSelected._id) {
            return data;
          }
          return programmeItem;
        });
        setProgrammes(newProgrammes);
        setLoading(true);
        notificationComponent("Notification", "Programme update ");
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
          _id: programmeSelected ? programmeSelected._id : null,
          title: programmeSelected ? programmeSelected.title : null,
          description: programmeSelected ? programmeSelected.description : null,
          videoLink: programmeSelected ? programmeSelected.videoLink : null,
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "title est requis",
            },
          ]}
        >
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item
          label="description "
          name="description"
          rules={[
            {
              required: true,
              message: "description est requis",
            },
          ]}
        >
          <Input placeholder="description" />
        </Form.Item>

        <Form.Item name="videoLink" label="lien video" rules={[]}>
          <Input placeholder="lien video" />
        </Form.Item>
        <Form.Item name="image" rules={[]}>
          <Upload listType="picture" beforeupload={false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ProgrammeForm;
