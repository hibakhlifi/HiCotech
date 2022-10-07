import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllDefiApi } from "../../../../Services/defiService";
import DefiCard from "./DefiCard";
import DefiForm from "./DefiForm";
import authService from "../../../../Services/authService";

const Defis = () => {
  const [loading, setLoading] = useState(false);
  const [defis, setDefis] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [defiSelected, setDefiSelected] = useState({});

  const currentUser = authService.getCurrentUser();

  const showModal = () => {
    setDefiSelected({ _id: "0000" });
    setIsModalVisible(true);
  };

  async function getDefis() {
    await getAllDefiApi({ creacteBy: currentUser.id })
      .then((response) => {
        setDefis(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getDefis();
  }, []);
  return (
    <>
      <Button
        type="primary"
        id="AddBtn"
        onClick={showModal}
        icon={<PlusOutlined />}
        style={{ float: "right" }}
      >
        Nouveau défi
      </Button>
      <div className="site-card-wrapper">
        {loading && (
          <Row gutter={16}>
            {defis.map((defi) => (
              <DefiCard
                defi={defi}
                loading={loading}
                key={defi._id}
                defis={defis}
                setDefis={setDefis}
                setLoading={setLoading}
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                setDefiSelected={setDefiSelected}
              />
            ))}
          </Row>
        )}
      </div>
      {loading && (
        <DefiForm
          key={defiSelected._id}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setDefis={setDefis}
          defis={defis}
          setLoading={setLoading}
          loading={loading}
          defiSelected={defiSelected}
        />
      )}
    </>
  );
};
export default Defis;
