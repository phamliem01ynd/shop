import React, { useContext } from "react";
import { categoryContext } from "../context/categoryContext";
import { Col, Row } from "antd";
import "./category.scss";

const Category = () => {
  const { category } = useContext(categoryContext);
  console.log(category);

  return (
    <>
      <div className="category">
        <Row justify={"center"} align={"middle"}>
          {category.map((item, index) => (
            <Col xxl={2} xl={2} lg={2} md={4} sm={4} xs={8} key={item.id}>
              <div className="category__list">
                <div className="image">
                  <img src={item.image} alt={item.name} />
                </div>
                <p>{item.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Category;
