import { Button, Form, Input } from "antd";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./login.scss";
const Login = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  const ref = useRef(null);
  return (
    <>
      <div>
        <Link to="/">Home</Link>/ Login
      </div>
      <div className="login">
        <div className="container">
          <div className="container__form sign-up">
            <Form name="basic" onFinish={onFinish} layout="vertical">
              <h1>Đăng ký</h1>
              <div className="social-icon">
                <FaFacebook className="icon" />
                <FaGoogle className="icon" />
                <FaGithub className="icon" />
                <FaLinkedin className="icon" />
              </div>
              <span>Hoặc sử dụng email để đăng ký</span>
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
                <Input type="email" placeholder="password" />
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
          <div className="container__form sign-in">
            <Form name="basic" onFinish={onFinish} layout="vertical">
              <h1>Đăng nhập</h1>
              <div className="social-icon">
                <FaFacebook className="icon" />
                <FaGoogle className="icon" />
                <FaGithub className="icon" />
                <FaLinkedin className="icon" />
              </div>
              <span>Hoặc sử dụng tài khoản có sẵn</span>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Làm ơn nhập tên người dùng",
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
                <Input type="email" placeholder="password" />
              </Form.Item>
              <Form.Item
                label={null}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <span>Quên mật khẩu</span>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-pannel toggle-left">
                <h1>Welcome back!</h1>
                <p>Nhập thông tin cá nhân để sử dụng toàn bộ tính năng</p>
                <Button className="hiddent" id="login">
                  Đăng nhập
                </Button>
              </div>
              <div className="toggle-pannel toggle-right">
                <h1>Welcome to!</h1>
                <p>Vui lòng đăng ký tài khoản để sử dụng toàn bộ tính năng</p>
                <Button className="hiddent" id="register">
                  Đăng nhập
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
