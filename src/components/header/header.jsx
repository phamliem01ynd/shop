import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Input, Select, Badge, Button, Drawer, Dropdown } from "antd";
import "./header.scss";
import Logo from "../logo";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { authContext } from "../context/authContext";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import ThemeToggle from "../theme/theme";
import { languageContext } from "../context/languageContext";
const Header = () => {
  const placeholders = ["laptop", "phone", "speaker", "airpoid", "electronic"];
  const { toggleLanguage, translations } = useContext(languageContext);

  const handleLogOut = () => {
    localStorage.clear("access_token");
    setAuth({
      isAuthenticated: false,
      user: {
        email: "",
        name: "",
      },
    });
    setOpenDrawer(false);
  };
  const items = [
    {
      key: "1",
      label: <Link to={"/"}>{translations.personal_profile}</Link>,
    },
    {
      key: "2",
      label: <Link to={"/"}>{translations.order}</Link>,
    },
    {
      key: "3",
      label: <span onClick={handleLogOut}>{translations.logout}</span>,
    },
  ];

  let timeoutRef = null;
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const { auth, setAuth } = useContext(authContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleMouseEnter = () => {
    if (timeoutRef) clearTimeout(timeoutRef);
    setOpenDrawer(true);
  };
  const handleMouseLeave = () => {
    timeoutRef = setTimeout(() => {
      setOpenDrawer(false);
    }, 1000);
  };
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setPlaceholder(placeholders[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header>
      <div className="header">
        <Row justify="center" align="middle">
          <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={12}>
            <Link to="/">
              <Logo />
            </Link>
            <div
              className="icon-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FaBars className="icon" />
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={0} xs={0}>
            <div className="header__search">
              <Input placeholder={`${translations.search}: "${placeholder}"`} />
              <div className="icon">
                <FaSearch />
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={12}>
            <div className="header__right">
              <Select
                defaultValue={"Langugage"}
                style={{ width: 80 }}
                onChange={toggleLanguage}
              >
                <Select.Option value="VI">VI</Select.Option>
                <Select.Option value="ENG">ENG</Select.Option>
              </Select>
              {isMobile ? (
                <div className="icon-menu">
                  <FaBars className="icon" />
                </div>
              ) : (
                <div className="header__login">
                  {auth.isAuthenticated ? (
                    <>
                      <div className="user">
                        <Dropdown menu={{ items }} arrow placement="bottom">
                          <div className="menu">
                            <FaRegUserCircle className="icon" />{" "}
                            <span>{auth.user.name}</span>
                          </div>
                        </Dropdown>
                      </div>
                      <div className="loginActive">
                        <Badge count={5} size="small">
                          <div>
                            <Link to="cart" style={{ color: "black" }}>
                              <FaCartPlus className="icon" />
                            </Link>
                          </div>
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="loginNoActive">
                        <Link to="/login">
                          <Button>{translations.login}</Button>
                        </Link>
                        <Link to="/register">
                          <Button>{translations.register}</Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Drawer
          title="Menu"
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          placement="top"
          height={"150px"}
        >
          <div className="header__menu">
            <Link>Home</Link>
            <Link>Shop</Link>
            <Link>About</Link>
            <Link>Cart</Link>
          </div>
          <div className="header__login">
            {auth.isAuthenticated ? (
              <>
                <div className="user">
                  <FaRegUserCircle className="icon" />
                  <span>{auth.user.name}</span>
                </div>
                <div className="loginActive">
                  <Badge count={5} size="small">
                    <div>
                      <Link to="cart" style={{ color: "black" }}>
                        <FaCartPlus className="icon" />
                      </Link>
                    </div>
                  </Badge>
                </div>
                <Button onClick={handleLogOut}>Đăng Xuất</Button>
              </>
            ) : (
              <>
                <div className="loginNoActive">
                  <Link to="/login">
                    <Button>Đăng Nhập</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Đăng Ký</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
