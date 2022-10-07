import React, { useState, useEffect } from "react";
import { Row, Table, Col, Alert, Typography } from "antd";
import userService from "../../../../Services/userService";
import authService from "../../../../Services/authService";
import playersdata from './palyers.json'
const { Title } = Typography;
import axios from "axios";
const Players = () => {
  const [dataSource, setDataSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
 
  useEffect(() => {
    axios.get('/api/users').then((res)=>setDataSource(res.data))
    if (authService.getCurrentUser()) {
      setLoading(true);

      userService
        .getUserApi(authService.getCurrentUser().id)
        .then((data) => {
         //setDataSource(data.data.myPlayers);
        })
        .catch((err) => {
          if (err && err.response && err.response.data.error) {
            setAlert(err.response.data.error);
          } else {
            setAlert({ type: "error", message: "erreur de serveur" });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "firstName",
      dataIndex: "firstName",
    },
    {
      title: "lastName",
      dataIndex: "lastName",
    },
    {
      title: "city",
      dataIndex: "city",
    },
  ];
  return (
    <>
      {alert && (
        <Row justify="center">
          <Col>
            <Alert
              message={alert.message}
              type={alert.type}
              showIcon
              closable
            />
          </Col>
        </Row>
      )}

      <Title level={2}>Liste des Joueurs</Title>

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

export default Players;
