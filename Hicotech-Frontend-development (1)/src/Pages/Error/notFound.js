import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Désolé, la page que vous avez visitée n’existe pas."
      extra={
        <Button type="primary" onClick={() => history.go(-2)}>
          Revenir
        </Button>
      }
    />
  );
};

export default NotFound;
