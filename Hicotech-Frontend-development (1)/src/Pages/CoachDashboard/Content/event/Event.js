import React from "react";
import { Modal, Form, DatePicker, Input } from "antd";

import moment from "moment";

const dateFormat = "YYYY/MM/DD";

const Event = (props) => {
  const { event, isEventVisible, setEventVisible } = props;
  const { title, description, etat } = event;
  const worker = moment(event.dateEvent);

  const handleOk = () => {
    setEventVisible(false);
  };

  const handleCancel = () => {
    setEventVisible(false);
  };

  return (
    <Modal
      title="Détails Event"
      visible={isEventVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          dateEvent: worker,
        }}
      >
        <img
          alt="details"
          src="https://thumbs.dreamstime.com/b/ic%C3%B4ne-de-programme-d-%C3%A9v%C3%A9nement-120823059.jpg"
          width="80"
          height="80"
        />

        <Form.Item label="Titre " name="title">
          <Input type="text" defaultValue={title} />
        </Form.Item>
        <Form.Item label="Description " name="description">
          <Input type="text" defaultValue={description} />
        </Form.Item>

        <Form.Item label="Date d'évenement " name="dateEvent">
          <DatePicker format={dateFormat} style={{ display: "flex" }} />
        </Form.Item>

        <Form.Item label="Etat " name="etat">
          <Input type="text" defaultValue={etat} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Event;
