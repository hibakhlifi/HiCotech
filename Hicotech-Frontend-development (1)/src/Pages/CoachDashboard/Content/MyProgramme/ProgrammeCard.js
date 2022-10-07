import React from "react";
import { Card, Col, Skeleton } from "antd";
import { StopOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import programmeIMG from "../../../../Assets/programme.jpg";
import { deleteProgrammeApi } from "../../../../Services/ProgrammeService";
import notificationComponent from "../../../../Components/NotificationComponent";

const ProgrammeCard = (props) => {
  const { Meta } = Card;
  const {
    programme,
    loading,
    programmes,
    setProgrammes,
    setLoading,
    setIsModalVisible,
    setProgrammeSelected,
    setProgrammeVisible,
  } = props;
  const { title, description } = programme;
  const imagesrc = programme.image === "" ? programmeIMG : programme.image;
  const onDelete = () => {
    setLoading(false);
    deleteProgrammeApi(programme._id).then(() => {
      setProgrammes(
        programmes.filter(
          (programmeItem) => programmeItem._id !== programme._id
        )
      );
      setLoading(true);
      notificationComponent("notification", "delete");
    });
  };

  const onUpdate = () => {
    setProgrammeSelected(programme);
    setIsModalVisible(true);
  };
  const programmeDetail = () => {
    setProgrammeSelected(programme);
    setProgrammeVisible(true);
  };
  return (
    <Col span={8} key={programme._id}>
      <Skeleton loading={!loading} avatar active>
        <Card
          actions={[
            <DeleteOutlined
              key="delete"
              onClick={onDelete}
              style={{ color: "#e11111" }}
            />,
            <StopOutlined
              key="stop"
              onClick={onUpdate}
              style={{ color: "#ffcd00" }}
            />,
            <EyeOutlined
              key="eye"
              onClick={programmeDetail}
              style={{ color: "#ffcdaa" }}
            />,
          ]}
          hoverable
          style={{ width: 320, marginTop: 40 }}
          cover={<img alt="example" src={imagesrc} />}
        >
          <Meta title={title} description={description} />
        </Card>
      </Skeleton>
    </Col>
  );
};
export default ProgrammeCard;
