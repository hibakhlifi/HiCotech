import React, { useState, useEffect } from "react";
import { Row, Button, Spin, Space, Col } from "antd";
import { getAllProgrammeApi } from "../../../../Services/ProgrammeService";
import ProgrammeCard from "./ProgrammeCard";
import ProgrammeForm from "./ProgrammeForm";
import Programme from "./programme";
import authService from "../../../../Services/authService";

const Programmes = () => {
  const [loading, setLoading] = useState(false);
  const [programmes, setProgrammes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [programmeSelected, setProgrammeSelected] = useState({});
  const [isProgrammeVisible, setProgrammeVisible] = useState(false);
  const currentUser = authService.getCurrentUser();

  const showModal = () => {
    setProgrammeSelected({ _id: "0000" });
    setIsModalVisible(true);
  };

  async function getProgrammes() {
    await getAllProgrammeApi({ creacteBy: currentUser.id })
      .then((response) => {
        setProgrammes(response.data.reverse());
        setLoading(true);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getProgrammes();
  }, []);
  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        create new programme
      </Button>
      <div className="site-card-wrapper">
        {loading && (
          <Row gutter={16}>
            {programmes.map((programme) => (
              <ProgrammeCard
                programme={programme}
                loading={loading}
                key={programme._id}
                programmes={programmes}
                setProgrammes={setProgrammes}
                setLoading={setLoading}
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                setProgrammeSelected={setProgrammeSelected}
                setProgrammeVisible={setProgrammeVisible}
              />
            ))}
          </Row>
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
        <ProgrammeForm
          key={programmeSelected._id}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setProgrammes={setProgrammes}
          programmes={programmes}
          setLoading={setLoading}
          loading={loading}
          programmeSelected={programmeSelected}
        />
      )}
      {isProgrammeVisible && (
        <Programme
          isProgrammeVisible={isProgrammeVisible}
          programme={programmeSelected}
          setProgrammeVisible={setProgrammeVisible}
        />
      )}
    </>
  );
};
export default Programmes;
