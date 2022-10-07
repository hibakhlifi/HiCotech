import React, { useState, useEffect } from "react";
import { Typography, Spin, message } from "antd";
import authService from "../../../../Services/authService";
import SessionsCards from "./SessionsCards";
import { getAllSeanceApi } from "../../../../Services/SeancesService";

const { Title } = Typography;

const SessionFeedback = () => {
  const [filtredSessions, setFiltredSessions] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.getCurrentUser()) {
      setLoading(true);
      getAllSeanceApi({
        creactedBy: authService.getCurrentUser().id,
      })
        .then(({ data }) => {
          setFiltredSessions(
            data.filter(
              (session) =>
                session?.sessionCancelled?.isCancelled === false &&
                Date.now() > Date.parse(session?.dateSeance) &&
                !session?.feedback
            )
          );
        })
        .catch(() =>
          message.error({
            content: "Erreur de serveur",
            duration: 3,
          })
        )
        .finally(() => setLoading(false));
    }
  }, [refetch]);
  return (
    <>
      <Title level={2}>Donnez votre feedback sur une séance :</Title>
      {loading ? (
        <Spin
          tip="Chargement..."
          style={{ width: "100%", textAlign: "center" }}
        />
      ) : (
        <SessionsCards data={filtredSessions} setRefetch={setRefetch} />
      )}
    </>
  );
};

export default SessionFeedback;
