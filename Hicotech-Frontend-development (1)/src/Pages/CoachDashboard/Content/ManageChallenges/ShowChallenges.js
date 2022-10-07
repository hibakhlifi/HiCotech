import React, { useState, useEffect } from "react";
import { Table, Tag, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import authService from "../../../../Services/authService";
import AddChallenge from "./AddChallenge";
import assignChallengeService from "../../../../Services/assignChallengeService";

const ShowChallenges = () => {
  const [dataSource, setDataSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    if (authService.getCurrentUser()) {
      setLoading(true);
      assignChallengeService
        .getCoachAssignedChallengesApi({
          createdBy: authService.getCurrentUser().id,
        })
        .then(({ data }) => {
          setDataSource(() => data);
        })
        .catch(() => {
          message.error({
            content: "Erreur de serveur",
            duration: 3,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [refetch]);

  const columns = [
    {
      title: "Défi",
      dataIndex: "defi",
      key: uuidv4(),
      render: (Défi) => <p>{Défi?.defiName}</p>,
    },
    {
      title: "Objectif",
      dataIndex: "defi",
      key: uuidv4(),
      render: (objectif) => <p>{objectif?.defiObjectif}</p>,
    },
    {
      title: "Date Limite",
      dataIndex: "deadline",
      key: uuidv4(),
      render: (deadline) => (
        <>
          <p>
            <CalendarOutlined /> {deadline?.slice(0, 10)}
          </p>
          <p>
            <ClockCircleOutlined /> {deadline?.slice(11, 19)}
          </p>
        </>
      ),
    },
    {
      title: "État",
      dataIndex: "deadline",
      key: uuidv4(),
      render: (deadline) => {
        const hasExpired = new Date(deadline) < Date.now();
        return (
          <Tag color={hasExpired ? "red" : "green"}>
            {hasExpired ? "expiré" : "valable"}
          </Tag>
        );
      },
    },
    {
      title: "Attribué à",
      dataIndex: "assignedTo",
      key: uuidv4(),
      render: (players) =>
        players.length === 0 ? (
          "-"
        ) : (
          <ul style={{ padding: 0 }}>
            {players.map((p) => (
              <li>{`${p.firstName} ${p.lastName}`}</li>
            ))}
          </ul>
        ),
    },
    {
      title: "Terminé le défi",
      dataIndex: "done",
      key: uuidv4(),
      render: (players) =>
        players.length === 0 ? (
          <p>Aucun</p>
        ) : (
          <ul style={{ padding: 0 }}>
            {players.map((p) => (
              <li>{`${p?.firstName} ${p?.lastName}`}</li>
            ))}
          </ul>
        ),
    },
  ];
  return (
    <>
      <AddChallenge setRefrech={setRefetch} />
      <br />
      <Table
        tableLayout="fixed"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={(record) => record._id}
        pagination={{
          pageSize: 5,
        }}
      />
    </>
  );
};

export default ShowChallenges;
