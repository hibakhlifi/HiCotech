import React, { useState, useEffect } from "react";
import { Typography, Spin, Tabs, message } from "antd";
import authService from "../../../../Services/authService";
import CanceledSessions from "./CanceledSessions";
import ToCancelSessions from "./ToCancelSessions";
import { getAllSeanceApi } from "../../../../Services/SeancesService";

const { TabPane } = Tabs;

const { Title } = Typography;

const CancelSession = () => {
  const [SessionData, setSessionsData] = useState([]);
  const [cancelledSessions, setCancelledChallenges] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.getCurrentUser()) {
      setLoading(true);
      getAllSeanceApi({
        creactedBy: authService.getCurrentUser().id,
      })
        .then(({ data }) => {
          setSessionsData(
            data.filter(
              (session) =>
                Date.parse(session?.dateSeance) > Date.now() &&
                !session?.sessionCancelled?.isCancelled
            )
          );
          setCancelledChallenges(
            data.filter((session) => session?.sessionCancelled?.isCancelled)
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
      <Title level={2}>Annuler Séances :</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="séances à annuler" key="1">
          {loading ? (
            <Spin
              tip="Chargement..."
              style={{ width: "100%", textAlign: "center" }}
            />
          ) : (
            <ToCancelSessions data={SessionData} setRefetch={setRefetch} />
          )}
        </TabPane>
        <TabPane tab="séances annulées" key="2">
          {loading ? (
            <Spin
              tip="Chargement..."
              style={{ width: "100%", textAlign: "center" }}
            />
          ) : (
            <CanceledSessions data={cancelledSessions} />
          )}
        </TabPane>
      </Tabs>
    </>
  );
};

export default CancelSession;
