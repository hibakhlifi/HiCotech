import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Button, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import moment from "moment";

import {
  addSeanceApi,
  getSeanceApi,
} from "../../../../Services/SeancesService";

import authService from "../../../../Services/authService";
import notificationComponent from "../../../../Components/NotificationComponent";
import { getAllProgrammeApi } from "../../../../Services/ProgrammeService";
import userService from "../../../../Services/userService";
import trainingGround from "../../../../Services/trainingGround";
import { getAllStatisticsApi } from "../../../../Services/StatisticService";
import { getAllSkillsApi } from "../../../../Services/SkillService";
import axios from "axios";

const { Option } = Select;
const SeanceForm = (props) => {
  const [form] = Form.useForm();
  const {
    setIsModalVisible,
    isModalVisible,
    setSeances,
    seances,
    seanceSelected,
  } = props;
  const modalTitle = "Ajouter une séance";
  const modalBtnText = "Ajouter";
  const [, setLoading] = useState(false);
  const [programmes, setProgrammes] = useState([]);
  const currentUser = authService.getCurrentUser();
  const [playersData, setplayersData] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [skills, setSkills] = useState([]);
  const [, setSeancedata] = useState({});
  const { id } = useParams();
  const handleOk = (values) => {
    const currentUser = authService.getCurrentUser();
    const seance = {
      ...values,
      creactedBy: currentUser.id,
    };
    setLoading(false);
    if (seanceSelected._id === "0000") {
      addSeanceApi(seance).then((response) => {
        const { data } = response;
        seances.push(data);
        setSeances(seances);
        notificationComponent("Notification", "Seance ajoute ");
        setLoading(true);
      });
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (authService.getCurrentUser()) {
      userService
        .getUserApi(authService.getCurrentUser().id)
        .then(({ data: { myPlayers } }) => {
          axios.get('/api/users').then((res)=>setplayersData(res.data))
          
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
    <Modal
      visible={isModalVisible}
      title={modalTitle}
      okText={modalBtnText}
      cancelText="Annuler"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleOk(values);
          })
          .catch(() => {});
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form"
        initialValues={{
          seanceName: seanceSelected ? seanceSelected.seanceName : null,
          dateSeance: seanceSelected ? moment(seanceSelected.dateSeance) : null,
          player: seanceSelected ? seanceSelected.player : null,
          programme: seanceSelected ? seanceSelected.programme : null,
          trainingGround: seanceSelected ? seanceSelected.trainingGround : null,
          statistics: seanceSelected ? seanceSelected.statistics : null,
          skills: seanceSelected ? seanceSelected.skills : null,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Nom du séance"
              name="seanceName"
              rules={[
                {
                  required: true,
                  message: "veuillez entrer le nom du séance ",
                },
              ]}
            >
              <Input placeholder="nom du séance" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="date de Séance"
              name="dateSeance"
              rules={[
                {
                  required: true,
                  message: "veuillez entrer date ",
                },
              ]}
            >
              <DatePicker format="YYYY/MM/DD" style={{ display: "flex" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Joueur"
              name="player"
              rules={[
                {
                  required: true,
                  message: "veuillez entrer le joueur  ",
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
              label="Programme"
              name="programme"
              rules={[
                {
                  required: true,
                  message: "veuillez entrer le programme ",
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
                      name={[name, "statistic"]}
                      rules={[{ required: true, message: "Missing statistic" }]}
                      label="Statistic"
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
                      label="Valeur de statistic"
                    >
                      <Input placeholder="valeur" />
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
                  Ajouter une statistique
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
                      name={[name, "skill"]}
                      rules={[{ required: true, message: "Missing skill" }]}
                      label="Skill"
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
                  Ajouter skills
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Terrain d'entrainement"
              name="trainingGround"
              rules={[
                {
                  required: true,
                  message: "veuillez entrer terrain d'entrainement ",
                },
              ]}
            >
              <Select
                allowClear
                maxTagCount="responsive"
                style={{ width: "100%" }}
                placeholder="Emplacement"
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
      </Form>
    </Modal>
  );
};

export default SeanceForm;
