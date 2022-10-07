import React from "react";
import "./invitation.css";
import { Button } from "antd";
import Logo from "../../../../Assets/logo.svg";
import { updateInvitationApi } from "../../../../Services/InvitationService";

const InvitationForm = (props) => {
  const { loading, expiration, invi, onChange } = props;

  async function updateInvitation(id) {
    await updateInvitationApi(id, { etat: "consulté" });
  }
  const confirmer = () => {
    updateInvitation(invi._id);
    onChange(true);
  };
  return (
    <div className="invitation">
      {loading && (
        <div className="invitation-form">
          <div className="logo-center">
            <img src={Logo} height={50} width={150} alt="" />
          </div>
          {!expiration && (
            <div className="invitation-text">Invitation expiration</div>
          )}
          {expiration && (
            <>
              <div className="invitation-text">
                Bonjour {invi.userData.firstName},{invi.creacteBy.firstName}{" "}
                {invi.creacteBy.lastName} ({invi.creacteBy.email}) vous a invité
                au Hicotech
              </div>
              <Button
                type="primary"
                className="invitation-form-button"
                onClick={confirmer}
              >
                Confirmer
              </Button>
              <Button className="invitation-form-button">Supprimer</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default InvitationForm;
