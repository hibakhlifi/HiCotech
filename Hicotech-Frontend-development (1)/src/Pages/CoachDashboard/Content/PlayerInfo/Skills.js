import React from "react";
import { List, Rate, Card, Empty } from "antd";
import { v4 as uuidv4 } from "uuid";

const Skills = ({ data = [] }) => (
  <div>
    {data.length ? (
      <List
        grid={{
          gutter: [30, 25],
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={uuidv4()}>
            <Card type="inner" title={item.name}>
              <b>Rating :</b>{" "}
              <Rate allowHalf disabled defaultValue={item.value} />
            </Card>
          </List.Item>
        )}
      />
    ) : (
      <Empty description="Aucune Donnée" />
    )}
  </div>
);

export default Skills;
