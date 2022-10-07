import React, { useState, useEffect } from "react";
import { Row, Button, Spin, Space, Col } from "antd";
import { getAllInvitationApi } from "../../../../Services/InvitationService";
import InvitationCard from "./InvitationCard";
import SendInvitation from "./SendInvitation";
import authService from "../../../../Services/authService";

const Invitations = () => {
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  async function getInvitations() {
    const currentUser = authService.getCurrentUser();
    await getAllInvitationApi({ creacteBy: currentUser.id })
      .then((response) => {
        setInvitations(response.data.reverse());
        setLoading(true);
      })
      .catch(() => {});
  }
  useEffect(() => {
    getInvitations();
  }, []);
  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        Send Invitation
      </Button>
      <div className="site-card-wrapper">
        {loading && (
          <Row gutter={16}>
            {invitations.map((invitation) => (
              <InvitationCard
                invitation={invitation}
                setLoading={setLoading}
                key={invitation._id}
                invitations={invitations}
                setInvitations={setInvitations}
                loading={loading}
              />
            ))}
          </Row>
        )}
        {!loading && (
          <Row gutter={16}>
            <Col span={8}>
              <Space size="middle" style={{ marginTop: 250, marginLeft: 600 }}>
                <Spin size="large" tip="Loading..." />
              </Space>
            </Col>
          </Row>
        )}
      </div>
      <SendInvitation
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        invitations={invitations}
        setInvitations={setInvitations}
        setLoading={setLoading}
      />
    </>
  );
};
export default Invitations;
