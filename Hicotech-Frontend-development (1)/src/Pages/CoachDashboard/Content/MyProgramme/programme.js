import React from "react";
import { Modal } from "antd";

const Programme = (props) => {
  const { programme, isProgrammeVisible, setProgrammeVisible } = props;
  const { title, description, videoLink } = programme;
  const handleOk = () => {
    setProgrammeVisible(false);
  };

  const handleCancel = () => {
    setProgrammeVisible(false);
  };

  return (
    <Modal
      title="Basic Modal"
      width={1000}
      visible={isProgrammeVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{title}</p>
      <p>{description}</p>

      <iframe
        width="950"
        height="615"
        src={videoLink}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </Modal>
  );
};
export default Programme;
