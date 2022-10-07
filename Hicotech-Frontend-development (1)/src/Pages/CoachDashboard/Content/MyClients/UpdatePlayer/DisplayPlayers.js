import React, { useEffect, useState } from "react";
import { Row, Col, Alert } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
import Title from "antd/lib/typography/Title";
import authService from "../../../../../Services/authService";
import userService from "../../../../../Services/userService";
import PleyersListItems from "./PlayersListItems";

const DisplayPlayers = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const loadData = () => {
    if (authService.getCurrentUser()) {
      setLoading(true);
      userService
        .getUserApi(authService.getCurrentUser().id)
        .then(({ data: { myPlayers } }) => {
          setData(myPlayers);
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
  };

  useEffect(() => {
    loadData();
  }, []);

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
      <Title>Modifier Joueur</Title>
      <Title level={4}>Selectionner un joueur :</Title>

      <PleyersListItems data={data} loading={loading} />
    </>
  );
};

export default DisplayPlayers;
