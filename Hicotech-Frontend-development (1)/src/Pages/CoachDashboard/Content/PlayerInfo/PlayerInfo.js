import React, { useState, useEffect } from "react";
import { Tabs, Form, Select, Empty, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import Statistics from "./Statistics";
import Skills from "./Skills";
import Alerts from "./Alerts";
import userService from "../../../../Services/userService";
import auth from "../../../../Services/authService";
import filterSessionData from "../../../../utils/filterSessionData";
import { getAllSeanceApi } from "../../../../Services/SeancesService";
import { getAllStatisticsApi } from "../../../../Services/StatisticService";
import ScheduledSessions from "./ScheduledSessions";
import Loading from "../../../../Components/Loading";

const { Option } = Select;
const { TabPane } = Tabs;

const PlayerInfo = () => {
  const [form] = Form.useForm();
  const [statisticTypes, setStatisticTypes] = useState([]);
  const [statisticData, setStatisticData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [skillsData, setSkillData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(undefined);
  const [selectedStatistic, setSelectedStatistic] = useState(undefined);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const FilterStats = (statId) => {
    setSelectedStatistic(statisticTypes.find((stat) => stat._id === statId));
    setStatisticData(filterSessionData.StatChartData(sessionData, statId));
  };

  useEffect(() => {
    if (selectedPlayer) {
      if (auth.getCurrentUser()) {
        getAllSeanceApi({
          creactedBy: auth.getCurrentUser().id,
          player: selectedPlayer,
        })
          .then(({ data }) => {
            setSessionData(data);
            setSkillData(filterSessionData.SkillsChartData(data));
          })
          .catch(() => {
            setSessionData([]);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [selectedPlayer]);

  useEffect(() => {
    if (auth.getCurrentUser()) {
      userService
        .getUserApi(auth.getCurrentUser().id)
        .then(({ data: { myPlayers } }) => {
          setPlayers(myPlayers);
        })
        .then(() => getAllStatisticsApi(auth.getCurrentUser().discipline))
        .then(({ data }) => {
          setStatisticTypes(data.statistic);
          form.submit();
        })
        .catch(() => {
          message.error({
            content:
              "Une erreur s’est produite lors de la récupération des données",
            duration: 3,
          });
        });
    }
  }, []);

  return (
    <Form form={form} autoComplete="off" name="Afficher Info Joueur">
      <Tabs
        defaultActiveKey="1"
        tabBarExtraContent={
          <Form.Item
            style={{ margin: 0, minWidth: 350 }}
            name="player"
            label="Sélectionnez joueur :"
            rules={[
              {
                required: true,
                message: "Veuiller selectionner le joueur",
              },
            ]}
          >
            <Select
              placeholder="Joueur"
              onChange={(p) => {
                setLoading(true);
                setSelectedPlayer(p);
              }}
            >
              {players.map((p) => (
                <Option key={uuidv4()} value={p._id}>
                  {`${p.firstName} ${p.lastName}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        }
      >
        <TabPane tab="Statistiques" key="1">
          {loading ? (
            <Loading />
          ) : selectedPlayer && sessionData.length !== 0 ? (
            <>
              <Form.Item
                style={{ maxWidth: "20%" }}
                name="Statistic"
                label="Statistique :"
                rules={[
                  {
                    required: true,
                    message: "Veuiller selectionner une statistique",
                  },
                ]}
              >
                <Select placeholder="Statistique" onChange={FilterStats}>
                  {statisticTypes.map((stat) => (
                    <Option key={uuidv4()} value={stat._id}>
                      {stat.statisticName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Statistics
                data={statisticData}
                selectedStatistic={selectedStatistic}
              />
            </>
          ) : (
            selectedPlayer && <Empty description="Aucune Donnée" />
          )}
        </TabPane>
        <TabPane tab="Compétences" key="2">
          {loading ? (
            <Loading />
          ) : (
            selectedPlayer && <Skills data={skillsData} />
          )}
        </TabPane>
        <TabPane tab="séances prévues" key="3">
          {loading ? (
            <Loading />
          ) : (
            selectedPlayer && <ScheduledSessions sessionData={sessionData} />
          )}
        </TabPane>
        <TabPane tab="Alerts" key="4">
          {loading ? (
            <Loading />
          ) : (
            selectedPlayer && <Alerts selectedPlayer={selectedPlayer} />
          )}
        </TabPane>
      </Tabs>
    </Form>
  );
};

export default PlayerInfo;
