import { Button, Form, Input, notification } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./login.scss";
import { authContext } from "../../components/context/authContext";
import { loginApi } from "../../utils/api";
import "@ant-design/v5-patch-for-react-19";
const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(authContext);
  const [isLogin, setIsLogin] = useState(false);
  const onFinish = async (values) => {
    const { email, password } = values;
    const result = await loginApi(email, password);
    if (result && result.EC === 0) {
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("showConfetti", "true");
      setIsLogin(true);
      setTimeout(() => {
        setIsLogin(false);
      }, 5000);
      notification.success({
        message: "Đăng nhập",
        description: "Đăng nhập thành công ",
      });
      setAuth({
        isAuthenticated: true,
        user: {
          email: result?.user?.email ?? "",
          name: result?.user?.name ?? "",
        },
      });
      navigate("/");
    } else {
      notification.error({
        message: "Đăng nhập",
        description: result?.message ?? "Đăng nhập thất bại",
      });
    }
  };
  return (
    <>
      <div>
        <Link to="/">Home</Link>/ Login
      </div>
      <div className="login">
        <div className="container">
          <div className="container__form">
            <h1>Đăng nhập</h1>
            <div className="social-icon">
              <FaFacebook className="icon" />
              <FaGoogle className="icon" />
              <FaGithub className="icon" />
              <FaLinkedin className="icon" />
            </div>
            <p>Hoặc sử dụng email để đăng nhập</p>
            <Form layout="vertical" name="login" onFinish={onFinish}>
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
            <h1>Webcome back</h1>
            <p>Vui lòng đăng nhập tài khoản để sử dụng toàn bộ tính năng</p>
            <Link to="/register">
              <Button className="hiddent" id="register">
                Đăng ký
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
