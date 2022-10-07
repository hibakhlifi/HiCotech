import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInvitationApi } from "../../../../Services/InvitationService";
import Register from "../../../Register/index";
import PageNotFound from "../../../PageNotFound";
import InvitationForm from "./InvitationForm";

const Invitation = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [expiration, setExpiration] = useState(true);
  const [user, setUser] = useState(false);

  const [invi, setInvi] = useState();

  async function invitation(id) {
    await getInvitationApi(id)
      .then((response) => {
        setInvi(response.data);
        const expiration =
          Date.parse(new Date()) < Date.parse(response.data.dateExpiration) &&
          !response.data.expired;
        setExpiration(expiration);
        setLoading(true);
      })
      .catch(() => {
        setLoading(false);
        setExpiration(false);
      });
  }

  useEffect(() => {
    invitation(id);
  }, []);
  const handleChange = (newValue) => {
    setUser(newValue);
  };
  return (
    <>
      {!loading && !expiration && <PageNotFound />}
      {user && <Register invi={invi} />}
      {!user && (
        <InvitationForm
          expiration={expiration}
          invi={invi}
          loading={loading}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default Invitation;
