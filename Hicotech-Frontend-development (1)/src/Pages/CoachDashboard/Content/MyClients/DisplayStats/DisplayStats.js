import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import authService from "../../../../../Services/authService";
import { getStatObjectiveByCoachAndPlayerApi } from "../../../../../Services/StatisticObjectiveService";
import { getAllObjectiveApi } from "../../../../../Services/SkillObjectiveService";
import StatisticObjective from "./StatisticObjective";
import SkillObjective from "./SkillObjective";

const DisplayStats = ({ player, setAlert }) => {
  const [objectiveData, setObjectiveData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const statData = await getStatObjectiveByCoachAndPlayerApi({
        creactedBy: authService.getCurrentUser().id,
        player: player._id,
      });

      const skilldata = await getAllObjectiveApi({
        creactedBy: authService.getCurrentUser().id,
        player: player._id,
      });
      setObjectiveData(statData.data);
      setSkillData(skilldata.data);
    };
    fetchData();
  }, [rerender]);
  return (
    <>
      <Divider orientation="center">
        <Title level={4}> Les Statistiques à atteindre</Title>
      </Divider>
      <StatisticObjective
        objectiveData={objectiveData}
        setObjectiveData={setObjectiveData}
        setAlert={setAlert}
        player={player}
        setRerender={setRerender}
        rerender={rerender}
      />

      <Divider orientation="center">
        <Title level={4}> Les Compétences à atteindre</Title>
      </Divider>
      <SkillObjective
        objectiveData={skillData}
        setObjectiveData={setSkillData}
        setAlert={setAlert}
        player={player}
        setRerender={setRerender}
        rerender={rerender}
      />
    </>
  );
};
export default DisplayStats;
