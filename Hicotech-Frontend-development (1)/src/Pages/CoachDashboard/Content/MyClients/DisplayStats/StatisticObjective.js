import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, List, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { deleteStatObjectiveApi } from "../../../../../Services/StatisticObjectiveService";
import AddStatObjectiveForm from "./AddStatObjectiveForm";
import ModifyStat from "./ModifyStat";

const StatisticObjective = ({
  objectiveData,
  setAlert,
  player,
  setRerender,
  rerender,
}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const [addStatModalVisible, setAddStatModalVisible] = useState(false);
  const showModal = (item) => {
    setDataToEdit(item);
    setModalVisible(true);
  };
  const handleDelete = (id) => {
    setLoading(true);
    deleteStatObjectiveApi(id)
      .then(() => {
        setAlert({
          type: "success",
          message: "objective suprimmer avec succées!",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(null);
          setRerender(!rerender);
        }, 1000);
      });
  };
  return (
    <>
      <ModifyStat
        setRerender={setRerender}
        rerender={rerender}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dataToEdit={dataToEdit}
        objectiveData={objectiveData}
        setAlert={setAlert}
      />
      <AddStatObjectiveForm
        setAlert={setAlert}
        modalVisible={addStatModalVisible}
        setModalVisible={setAddStatModalVisible}
        rerender={rerender}
        setRerender={setRerender}
        objectiveData={objectiveData}
        setLoading={setLoading}
        player={player}
      />
      <Spin spinning={loading}>
        <List
          size="large"
          rowKey={uuidv4()}
          header={
            <>
              <Title style={{ display: "inline-block" }} level={5}>
                Liste des statistiques :
              </Title>
              <Button
                size="middle"
                style={{
                  float: "right",
                  justifyContent: "flex-end",
                  alignItems: "end",
                }}
                type="primary"
                onClick={() => setAddStatModalVisible(!addStatModalVisible)}
              >
                Ajouter
              </Button>
            </>
          }
          bordered
          dataSource={objectiveData}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <Button
                    onClick={() => showModal(item)}
                    type="link"
                    icon={<EditOutlined />}
                    size="middle"
                  />
                  <Button
                    type="link"
                    onClick={() => handleDelete(item._id)}
                    icon={
                      <DeleteOutlined
                        style={{
                          color: "red",
                          fontSize: "16px",
                        }}
                      />
                    }
                    size="middle"
                  />
                </>,
              ]}
            >
              <List.Item.Meta
                title={`atteindre ${item.value} ${item.statistic.unit} en ${item.statistic.statisticName}`}
                description={`avant le ${moment(item.beforeDate).format(
                  "DD-MM-YYYY HH:mm:ss"
                )}`}
              />
              {item.done ? (
                <>
                  <CheckOutlined style={{ color: "green" }} />
                  <span> achevé</span>
                </>
              ) : (
                <>
                  <CloseOutlined style={{ color: "#e11111" }} />
                  <span> non achevé</span>
                </>
              )}
            </List.Item>
          )}
        />
      </Spin>
    </>
  );
};

export default StatisticObjective;
