import React, { useState, useEffect } from "react";
import { Typography, message, Tabs, Spin } from "antd";
import authService from "../../../../Services/authService";
import TodoChallenges from "./TodoChallenges";
import DoneChallenges from "./DoneChallenges";
import ExpiredChallenges from "./ExpiredChallenges";
import assignChallengeService from "../../../../Services/assignChallengeService";

const { TabPane } = Tabs;

const { Title } = Typography;

const MyChallenges = () => {
  const [todoChallenges, setTodoChallenges] = useState([]);
  const [finishedChallenges, setFinishedChallenges] = useState([]);
  const [expiredChallenges, setExpiredChallenges] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.getCurrentUser()) {
      setLoading(true);
      assignChallengeService
        .getPlayerAssignedChallengesApi({
          assignedTo: authService.getCurrentUser().id,
        })
        .then(({ data }) => {
          setTodoChallenges(
            data.filter(
              (challenge) =>
                !challenge.done.includes(authService.getCurrentUser().id) &&
                new Date(challenge.deadline) > Date.now()
            )
          );
          setFinishedChallenges(
            data.filter((challenge) =>
              challenge.done.includes(authService.getCurrentUser().id)
            )
          );
          setExpiredChallenges(
            data.filter(
              (challenge) =>
                new Date(challenge.deadline) < Date.now() &&
                !challenge.done.includes(authService.getCurrentUser().id)
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
      <Title level={2}>Mes Défis :</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="à faire" key="1">
          {loading ? (
            <Spin
              tip="Chargement..."
              style={{ width: "100%", textAlign: "center" }}
            />
          ) : (
            <TodoChallenges data={todoChallenges} setRefetch={setRefetch} />
          )}
        </TabPane>
        <TabPane tab="fini" key="2">
          {loading ? (
            <Spin
              tip="Chargement..."
              style={{ width: "100%", textAlign: "center" }}
            />
          ) : (
            <DoneChallenges data={finishedChallenges} />
          )}
        </TabPane>
        <TabPane tab="expiré" key="3">
          {loading ? (
            <Spin
              tip="Chargement..."
              style={{ width: "100%", textAlign: "center" }}
            />
          ) : (
            <ExpiredChallenges data={expiredChallenges} />
          )}
        </TabPane>
      </Tabs>
    </>
  );
};

export default MyChallenges;
