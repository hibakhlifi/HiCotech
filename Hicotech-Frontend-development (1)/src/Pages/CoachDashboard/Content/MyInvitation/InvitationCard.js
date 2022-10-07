import React from "react";
import { Skeleton, Card, Avatar, Col } from "antd";
import { StopOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteInvitationApi,
  updateInvitationApi,
} from "../../../../Services/InvitationService";
import notificationComponent from "../../../../Components/NotificationComponent";

const InvitationCard = (props) => {
  const { Meta } = Card;
  const { invitation, loading, setLoading, invitations, setInvitations } =
    props;
  const title = `Invitation Joueur ${invitation.userData.firstName} ${invitation.userData.lastName} `;
  const etat = `Invitation ${invitation.etat}`;

  const onDelete = () => {
    setLoading(false);
    deleteInvitationApi(invitation._id).then(() => {
      setInvitations(
        invitations.filter(
          (invitationItem) => invitationItem._id !== invitation._id
        )
      );
      setLoading(true);
      notificationComponent("notification", "delete invi");
    });
  };
  const onUpdate = () => {
    if (invitation.expired !== true) {
      setLoading(false);
      updateInvitationApi(invitation._id, {
        etat: "annulé",
        expired: true,
      }).then((res) => {
        const { data } = res;
        const newInvitations = invitations.map((invitationItem) => {
          if (invitationItem._id === invitation._id) return data;
          return invitationItem;
        });
        setInvitations(newInvitations);
        setLoading(true);
        notificationComponent("Notification", "Invitation update ");
      });
    } else {
      notificationComponent("Notification", "Invitation déja experid");
    }
  };
  return (
    <Col span={8}>
      <Card
        style={{ marginTop: 16 }}
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
        ]}
      >
        <Skeleton loading={!loading} avatar active>
          <Meta
            avatar={
              <Avatar style={{ color: "#fff", backgroundColor: "#36a2e1" }}>
                {invitation.userData.firstName.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={title}
            description={etat}
          />
          <p> Email : {invitation.email} </p>
          <p> CreatedAt : {invitation.createdAt}</p>
          {invitation.acceptedBy && (
            <p> AcceptedBy : {invitation.acceptedBy.email} </p>
          )}
        </Skeleton>
      </Card>
    </Col>
  );
};
export default InvitationCard;
