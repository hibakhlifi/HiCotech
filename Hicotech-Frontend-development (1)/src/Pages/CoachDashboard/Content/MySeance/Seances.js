import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Button, Spin, Space, Col, Select, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { getAllSeanceApi } from "../../../../Services/SeancesService";
import userService from "../../../../Services/userService";
import { getAllProgrammeApi } from "../../../../Services/ProgrammeService";
import SeanceForm from "./SeanceForm";
import authService from "../../../../Services/authService";

const { Option } = Select;
const Seances = () => {
  const [loading, setLoading] = useState(false);
  const [seances, setSeances] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seanceSelected, setSeanceSelected] = useState({});
  const [playersData, setplayersData] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [dataSourceAll, setDataSourceAll] = useState(null);
  const currentUser = authService.getCurrentUser();
  const history = useHistory();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const columns = [
    {
      title: "Nom séance",
      dataIndex: "seanceName",
      key: "seanceName",
    },
    {
      title: "Joueur",
      dataIndex: ["player", "email"],
    },
    {
      title: "Date",
      dataIndex: "dateSeance",
      key: "dateSeance",
    },
    {
      title: "Programme",
      dataIndex: ["programme", "title"],
      key: "programme",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              history.push(`/coach/dashboard/seance/${record._id}`);
            }}
          />
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setSeanceSelected({ _id: "0000" });
    setIsModalVisible(true);
  };

  async function getSeances() {
    await getAllSeanceApi({ creactedBy: currentUser.id })
      .then((response) => {
        setDataSource(response.data);
        setDataSourceAll(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }
  const onJoueurChange = (value) => {
    const dataChange = dataSourceAll.filter(
      (seance) => seance.player && seance.player.email === value
    );
    setDataSource(dataChange);
  };
  const onProgrammeChange = (value) => {
    const dataChange = dataSourceAll.filter(
      (seance) => seance.programme && seance.programme.title === value
    );
    setDataSource(dataChange);
  };
  useEffect(() => {
    userService
      .getUserApi(authService.getCurrentUser().id)
      .then(({ data: { myPlayers } }) => {
        setplayersData(myPlayers);
      })
      .catch(() => {});
    getAllProgrammeApi({ creacteBy: currentUser.id })
      .then((response) => {
        setProgrammes(response.data);
      })
      .catch(() => {});
    getSeances();
  }, []);
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button key={date}>{date}</Button>
        <Select
          id="select"
          showSearch
          onChange={onJoueurChange}
          placeholder="Filter par joueur "
        >
          {playersData.map((player) => (
            <Option key={player._id} value={player.email}>
              {`${player.email}`}
            </Option>
          ))}
        </Select>
        <Select
          showSearch
          onChange={onProgrammeChange}
          placeholder="Filter par programme "
        >
          {programmes.map((programme) => (
            <Option key={programme._id} value={programme.title}>
              {programme.title}
            </Option>
          ))}
        </Select>
      </Space>
      <Button
        data-testid="btnAdd"
        type="primary"
        onClick={showModal}
        style={{ float: "right" }}
      >
        Nouvelle séance
      </Button>
      <div className="site-card-wrapper">
        {loading && (
          <Table
            tableLayout="fixed"
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: 5,
            }}
            rowKey={(record) => record._id}
          />
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
      </div>
      {loading && (
        <SeanceForm
          key={seanceSelected._id}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setSeances={setSeances}
          seances={seances}
          setLoading={setLoading}
          loading={loading}
          seanceSelected={seanceSelected}
        />
      )}
    </>
  );
};
export default Seances;
