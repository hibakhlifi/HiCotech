import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllEventApi } from "../../../../Services/EventService";
import EventCard from "./EventCard";
import EventForm from "./EventForm";
import Event from "./Event";

import authService from "../../../../Services/authService";

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventSelected, setEventSelected] = useState({});
  const [isEventVisible, setEventVisible] = useState(false);
  const currentUser = authService.getCurrentUser();

  const showModal = () => {
    setEventSelected({ _id: "0000" });
    setIsModalVisible(true);
  };

  async function getEvents() {
    if (currentUser.role === "coach") {
      await getAllEventApi({ creacteBy: currentUser.id, eventVisible: true })
        .then((response) => {
          setEvents(response.data);
          setLoading(true);
        })
        .catch(() => {});
    } else {
      await getAllEventApi({ eventVisible: true })
        .then((response) => {
          setEvents(response.data);
          setLoading(true);
        })
        .catch(() => {});
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div>
        <Button
          id="AddBtn"
          type="primary"
          onClick={showModal}
          style={{ float: "right" }}
          icon={<PlusOutlined />}
        >
          Ajouter
        </Button>
      </div>
      <div className="site-card-wrapper">
        {loading && (
          <Row gutter={16}>
            {events.map((event) => (
              <EventCard
                event={event}
                loading={loading}
                key={event._id}
                events={events}
                setEvents={setEvents}
                setLoading={setLoading}
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                setEventSelected={setEventSelected}
                setEventVisible={setEventVisible}
              />
            ))}
          </Row>
        )}
        ;
      </div>
      {loading && (
        <EventForm
          key={eventSelected._id}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setEvents={setEvents}
          events={events}
          setLoading={setLoading}
          loading={loading}
          eventSelected={eventSelected}
          setEventVisible={setEventVisible}
        />
      )}
      {isEventVisible && (
        <Event
          isEventVisible={isEventVisible}
          event={eventSelected}
          setEventVisible={setEventVisible}
        />
      )}
    </>
  );
};
export default Events;
