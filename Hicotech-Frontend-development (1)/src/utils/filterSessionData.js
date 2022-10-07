import _ from "lodash";

const SkillsChartData = (arr = []) => {
  const filtredData = arr
    .filter((session) => !!session.skills)
    .map((session) =>
      session.skills
        .filter((skill) => skill.value !== null && skill.skill)
        .map((el) => ({
          name: el.skill.skillName,
          value: el.value,
        }))
    )
    .filter((arr) => arr.length !== 0)
    .reduce((flat, next) => flat.concat(next), []);

  const grouped = _(filtredData)
    .groupBy("name")
    .mapValues((skills) => _(skills).meanBy("value"))
    .entries()
    .map((skill) => ({ name: skill[0], value: skill[1] }))
    .value();
  return grouped;
};

const StatChartData = (arr = [], statId = "") =>
  arr
    .filter((session) => !!session?.statistics)
    .map((session) =>
      session.statistics
        .filter((el) => el.statistic._id === statId && el.value !== null)
        .map((el) => ({
          value: el.value,
          date: session.dateSeance.slice(0, 10),
        }))
    )
    .filter((arr) => arr.length)
    .reduce((flat, next) => flat.concat(next), []);

export default {
  SkillsChartData,
  StatChartData,
};
