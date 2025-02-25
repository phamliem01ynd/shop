import React from "react";
import { Row, Col, Input } from "antd";
import "./header.scss";
import Logo from "../logo";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Header = () => {
  return (
    <header>
      <div className="header">
        <Row justity="center" align="middle">
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Link to="/">
              <Logo />
            </Link>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <div className="header__search">
              <Input placeholder="Tìm kiếm" />
              <div className="icon">
                <FaSearch />
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <div className="header__right"></div>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default Header;
