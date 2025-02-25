import React from "react";
import { Row, Col, Input } from "antd";
import "./header.scss";
import Logo from "../logo";
import { Link } from "react-router-dom";
const header = () => {
  return (
		<>
			<header>
				<Row justity="center" align="middle">
					<Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
						<Link to="/">
							<Logo />
						</Link>
					</Col>
					<Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
						<Input placeholder="Tìm kiếm" />
					</Col>
					<Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
					Dropdown
					</Col>
				</Row>
			</header>
		</>
	);
};

export default header;
