import React, { useEffect, useState } from "react";
import { Button, Space, Alert, Collapse, Badge, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import alertService from "../../../../Services/alertService";
import authService from "../../../../Services/authService";

const BadgeComponent = ({ length, backgroundColor }) =>
  !!length && (
    <Badge
      className="site-badge-count-109"
      count={length}
      style={{ backgroundColor }}
    />
  );
const { Panel } = Collapse;
const Alerts = ({ selectedPlayer }) => {
  const [refetch, setRefetch] = useState(0);
  const [positiveAlerts, setPositiveAlerts] = useState([]);
  const [negativelerts, setNegativeAlerts] = useState([]);

  const markAlertType = (id, alertType) => {
    alertService
      .updateAlertsApi(id, { alertType })
      .then(() => {
        message.success({
          content: "Mis à jour avec succès",
          duration: 2,
        });
        setRefetch((prev) => prev + 1);
      })
      .catch(() => {
        message.error({
          content: "Erreur de serveur",
          duration: 3,
        });
      });
  };

  useEffect(() => {
    if (selectedPlayer) {
      alertService
        .getAlertsApi({
          player: selectedPlayer,
          coach: authService.getCurrentUser().id,
          alertType: "utile",
        })
        .then(({ data }) => {
          setPositiveAlerts(data.filter((alert) => alert.isPositiveAlert));
          setNegativeAlerts(data.filter((alert) => !alert.isPositiveAlert));
        })
        .catch(() =>
          message.error({
            content:
              "Une erreur s’est produite lors de la récupération des données",
            duration: 3,
          })
        );
    }
  }, [refetch, selectedPlayer]);
  return (
    <div className="site-card-wrapper">
      <Collapse style={{ width: "50%" }}>
        <Panel
          header="Alertes positives"
          key="1"
          style={{ backgroundColor: "rgba(212,237,217,.5)" }}
          extra={
            <BadgeComponent
              length={positiveAlerts.length}
              backgroundColor="#52c41a"
            />
          }
        >
          {positiveAlerts.map((alert) => (
            <Alert
              key={uuidv4()}
              description={`Le joueur ${`${alert.player.firstName} ${alert.player.lastName}`} ${
                alert?.isPositiveAlert ? "a" : "n'a pas"
              } atteint l'objectif spécifiée avant la date ${alert?.date?.slice(
                0,
                10
              )} en ${alert?.maximiser ? "maximisant" : "réduisant"} ${
                alert?.statistique?.statisticName
              } à ${alert?.valeurObj} ${alert?.statistique?.unit}`}
              type="success"
              action={
                <Space direction="vertical">
                  <Button
                    size="small"
                    type="primary"
                    style={{ width: "100%" }}
                    onClick={() => markAlertType(alert._id, "utile")}
                  >
                    utils
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    danger
                    onClick={() => markAlertType(alert._id, "pas utile")}
                  >
                    pas utils
                  </Button>
                </Space>
              }
            />
          ))}
        </Panel>
        <Panel
          header="Alertes négatives"
          style={{ backgroundColor: "rgba(248,243,214,.5)" }}
          key="2"
          extra={
            <BadgeComponent
              length={negativelerts.length}
              backgroundColor="#BAA87A"
            />
          }
        >
          {negativelerts.map((alert) => (
            <Alert
              key={uuidv4()}
              description={`Le joueur ${`${alert?.player?.firstName} ${alert?.player.lastName}`} ${
                alert?.isPositiveAlert ? "a" : "n'a pas"
              } atteint l'objectif spécifiée avant la date ${alert?.date?.slice(
                0,
                10
              )} en ${alert?.maximiser ? " maximisant" : " réduisant"} ${
                alert?.statistique?.statisticName
              } à ${alert?.valeurObj} ${alert?.statistique?.unit}`}
              type="warning"
              action={
                <Space direction="vertical">
                  <Button
                    size="small"
                    type="primary"
                    style={{ width: "100%" }}
                    onClick={() => markAlertType(alert._id, "utile")}
                  >
                    utils
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    danger
                    onClick={() => markAlertType(alert._id, "pas utile")}
                  >
                    pas utils
                  </Button>
                </Space>
              }
            />
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Alerts;
