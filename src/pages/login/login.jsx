import { Button, Form, Input, notification } from "antd";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import "./login.scss";
import { authContext } from "../../components/context/authContext";
import { loginApi } from "../../utils/api";
import "@ant-design/v5-patch-for-react-19";
import { languageContext } from "../../components/context/languageContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(authContext);
  const { translations } = useContext(languageContext); 
  const [isLogin, setIsLogin] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;
    const result = await loginApi(email, password);
    if (result && result.EC === 0) {
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("showConfetti", "true");
      setIsLogin(true);
      setTimeout(() => setIsLogin(false), 5000);
      notification.success({
        message: translations.login, 
        description: translations.login_success,
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
        message: translations.login,
        description: result?.message ?? translations.login_fail,
      });
    }
  };

  return (
    <>
      <div>
        <Link to="/">Home</Link> / {translations.login}
      </div>
      <div className="login">
        <div className="container">
          <div className="container__form">
            <h1>{translations.login}</h1>
            <div className="social-icon">
              <FaFacebook className="icon" />
              <FaGoogle className="icon" />
              <FaGithub className="icon" />
              <FaLinkedin className="icon" />
            </div>
            <p>{translations.use_email_to_login}</p>
            <Form layout="vertical" name="login" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: translations.enter_email,
                  },
                ]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: translations.enter_password,
                  },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item
                label={null}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button type="primary" htmlType="submit">
                  {translations.login}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="container__title">
            <h1>{translations.welcome_back}</h1>
            <p>{translations.please_login_to_use_all_features}</p>
            <Link to="/register">
              <Button className="hiddent" id="register">
                {translations.register}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
