import { Button, Form, Input, notification } from "antd";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { createUserApi } from "../../utils/api";
const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (value) => {
    const { name, email, password } = value;
    const result = await createUserApi(name, email, password);
    if (result) {
      notification.success({
        message: "Đăng ký",
        description: "Đăng ký thành công",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Đăng ký",
        description: "Đăng ký thật bại",
      });
    }
  };
  return (
    <>
      <div className="login">
        <div className="container">
          <div className="container__form">
            <h1>Đăng ký</h1>
            <div className="social-icon">
              <FaFacebook className="icon" />
              <FaGoogle className="icon" />
              <FaGithub className="icon" />
              <FaLinkedin className="icon" />
            </div>
            <p>Hoặc sử dụng email để đăng ký</p>
            <Form layout="vertical" name="register" onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Làm ơn nhập name",
                  },
                ]}
              >
                <Input type="text" placeholder="name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Làm ơn nhập email",
                  },
                ]}
              >
                <Input type="email" placeholder="email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Làm ơn nhập password",
                  },
                ]}
              >
                <Input type="password" placeholder="password" />
              </Form.Item>
              <Form.Item
                label={null}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="container__title">
            <h1>Webcome to</h1>
            <p>Vui lòng đăng ký tài khoản để sử dụng toàn bộ tính năng</p>
            <Link to="/login">
              <Button className="hiddent" id="register">
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
