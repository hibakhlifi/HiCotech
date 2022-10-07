import React from "react";
import { Card, Col, Skeleton, Typography } from "antd";
import { FormOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { deleteEventApi } from "../../../../Services/EventService";
import notificationComponent from "../../../../Components/NotificationComponent";

const EventCard = (props) => {
  const { Meta } = Card;
  const {
    event,
    loading,
    events,
    setEvents,
    setLoading,
    setIsModalVisible,
    setEventSelected,
    setEventVisible,
  } = props;
  const { title, dateEvent } = event;
  const DateEv = moment(dateEvent).format("YYYY-MM-DD");

  const onDelete = () => {
    setLoading(false);
    deleteEventApi(event._id).then(() => {
      setEvents(events.filter((eventItem) => eventItem._id !== event._id));
      setLoading(true);
      notificationComponent(
        "Notification",
        "L'évenement est supprimé avec succées"
      );
    });
  };

  const onUpdate = () => {
    setEventSelected(event);
    setIsModalVisible(true);
  };
  const eventDetail = () => {
    setEventSelected(event);
    setEventVisible(true);
  };

  return (
    <Col span={8} key={event._id}>
      <Skeleton loading={!loading} avatar active>
        <Card
          actions={[
            <CloseOutlined
              key="delete"
              onClick={onDelete}
              style={{ color: "#e11111" }}
            />,

            <FormOutlined
              key="stop"
              onClick={onUpdate}
              style={{ color: "#B918E1" }}
            />,

            <EyeOutlined
              key="stop"
              onClick={eventDetail}
              style={{ color: "#060601" }}
            />,
          ]}
          hoverable
          style={{ width: 200, marginTop: 40 }}
          cover={
            <img
              alt="example"
              src="https://thumbs.dreamstime.com/b/ic%C3%B4ne-plate-d…us-buts-se-perfectionnent-le-web-et-138650049.jpg"
            />
          }
        >
          <Meta title={title} />
          <Typography paragraph>
            <i>
              <b>Le :</b>
            </i>
            <moment>
              <i>{DateEv}</i>
            </moment>
          </Typography>
        </Card>
      </Skeleton>
    </Col>
  );
};
export default EventCard;
