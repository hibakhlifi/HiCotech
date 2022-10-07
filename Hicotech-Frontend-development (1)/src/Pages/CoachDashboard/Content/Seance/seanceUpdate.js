import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Space,
  Spin,
  message,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getAllProgrammeApi } from "../../../../Services/ProgrammeService";
import authService from "../../../../Services/authService";
import userService from "../../../../Services/userService";
import trainingGround from "../../../../Services/trainingGround";
import { getAllStatisticsApi } from "../../../../Services/StatisticService";
import {
  getSeanceApi,
  updateSeanceApi,
} from "../../../../Services/SeancesService";
import { getAllSkillsApi } from "../../../../Services/SkillService";

const { Option } = Select;
const { Title } = Typography;
const SeanceUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [programmes, setProgrammes] = useState([]);
  const currentUser = authService.getCurrentUser();
  const [playersData, setplayersData] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [skills, setSkills] = useState([]);
  const [seancedata, setSeancedata] = useState({});
  const [form] = Form.useForm();
  const { id } = useParams();

  const onFinish = (values) => {
    updateSeanceApi(id, values).then(() => {
      message.success("Mise a jour effectué avec succes ");
    });
  };

  useEffect(() => {
    if (authService.getCurrentUser()) {
      userService
        .getUserApi(authService.getCurrentUser().id)
        .then(({ data: { myPlayers } }) => {
          setplayersData(myPlayers);
        })
        .catch(() => {});

      trainingGround
        .getTrainingGroudsApi(authService.getCurrentUser().id)
        .then(({ data }) => {
          setGrounds(() => data.data);
        })
        .catch(() => {});

      getAllProgrammeApi({ creacteBy: currentUser.id })
        .then((response) => {
          setProgrammes(response.data);
        })
        .catch(() => {});

      getAllStatisticsApi(authService.getCurrentUser().discipline)
        .then((res) => {
          setStatistics(res.data.statistic);
        })
        .catch(() => {});

      getAllSkillsApi(authService.getCurrentUser().discipline).then((res) => {
        setSkills(res.data.skill);
      });
      getSeanceApi(id)
        .then((res) => {
          setSeancedata(res.data);
          setLoading(true);
        })
        .catch(() => {});
    }
  }, []);
  return (
    <>
      <Title level={2}>Modifier Seance </Title>
      {loading && (
        <Form
          form={form}
          layout="vertical"
          name="form"
          initialValues={{
            seanceName: seancedata ? seancedata.seanceName : null,
            dateSeance: seancedata ? moment(seancedata.dateSeance) : null,
            player: seancedata ? seancedata.player._id : null,
            programme: seancedata ? seancedata.programme._id : null,
            trainingGround: seancedata ? seancedata.trainingGround._id : null,
            statistics: seancedata ? seancedata.statistics : null,
            skills: seancedata ? seancedata.skills : null,
          }}
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="nom du seance"
                name="seanceName"
                rules={[
                  {
                    required: true,
                    message: "veuillez entrer le nom du seance ",
                  },
                ]}
              >
                <Input placeholder="nom du seance" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="dateSeance"
                name="dateSeance"
                rules={[
                  {
                    required: true,
                    message: "veuillez entrer date ",
                  },
                ]}
              >
                <DatePicker
                  format="YYYY/MM/DD"
                  placeholder="Date seance"
                  style={{ display: "flex" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="player"
                name="player"
                rules={[
                  {
                    required: true,
                    message: "veuillez entrer player ",
                  },
                ]}
              >
                <Select
                  allowClear
                  maxTagCount="responsive"
                  style={{ width: "100%" }}
                  placeholder="Joueurs"
                >
                  {playersData.map((player) => (
                    <Option key={player._id} value={player._id}>
                      {`${player.firstName} ${player.lastName}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="programme"
                name="programme"
                rules={[
                  {
                    required: true,
                    message: "veuillez entrer programme ",
                  },
                ]}
              >
                <Select
                  allowClear
                  maxTagCount="responsive"
                  style={{ width: "100%" }}
                  placeholder="Programme"
                >
                  {programmes.map((programme) => (
                    <Option key={programme._id} value={programme._id}>
                      {programme.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="statistics">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "statistic", "_id"]}
                        rules={[
                          { required: true, message: "Missing statistic" },
                        ]}
                        label="statistic"
                      >
                        <Select
                          allowClear
                          maxTagCount="responsive"
                          style={{ width: "100%" }}
                          placeholder="statistics"
                        >
                          {statistics.map((statistic) => (
                            <Option key={statistic._id} value={statistic._id}>
                              {statistic.statisticName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        rules={[{ required: true, message: "statistic value" }]}
                        label="statistic value"
                      >
                        <Input placeholder="statistic value" />
                      </Form.Item>
                    </Col>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add statistic value
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name="skills">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "skill", "_id"]}
                        rules={[{ required: true, message: "Missing skill" }]}
                        label="skill"
                      >
                        <Select
                          allowClear
                          maxTagCount="responsive"
                          style={{ width: "100%" }}
                          placeholder="statistics"
                        >
                          {skills.map((skill) => (
                            <Option key={skill._id} value={skill._id}>
                              {skill.skillName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        rules={[{ required: true, message: "skill value" }]}
                        label="skill value"
                      >
                        <Input placeholder="skill value" />
                      </Form.Item>
                    </Col>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add skills value
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="trainingGround"
                name="trainingGround"
                rules={[
                  {
                    required: true,
                    message: "veuillez entrer trainingGround ",
                  },
                ]}
              >
                <Select
                  allowClear
                  maxTagCount="responsive"
                  style={{ width: "100%" }}
                  placeholder="trainingGround"
                >
                  {grounds.map((ground) => (
                    <Option key={ground._id} value={ground._id}>
                      {`${ground.address} , ${ground.city}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
      {!loading && (
        <Row gutter={16}>
          <Col span={8}>
            <Space size="middle" style={{ marginTop: 250, marginLeft: 600 }}>
              <Spin size="large" tip="Loading..." />
            </Space>
          </Col>
        </Row>
      )}
    </>
  );
};
export default SeanceUpdate;
