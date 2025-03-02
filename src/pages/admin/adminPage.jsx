import { IoHome } from "react-icons/io5";
import { AiFillCustomerService } from "react-icons/ai";
import { FaPerson } from "react-icons/fa6";
import { FaBorderAll } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import { Row, Col, Menu } from "antd";
import "./adminPage.scss";
function AdminPage() {
  const items = [
    {
      key: "sub1",
      label: "Trang Chủ",
      icon: <IoHome />,
      path: "/admin",
    },
    {
      key: "sub2",
      label: "Khách Hàng",
      icon: <AiFillCustomerService />,
      path: "user",
    },
    {
      key: "sub3",
      label: "Nhân Viên",
      icon: <FaPerson />,
      path: "staff",
    },
    {
      key: "sub4",
      label: "Đơn Hàng",
      icon: <FaBorderAll />,
      path: "order",
    },
    {
      key: "sub5",
      label: "Danh Mục",
      icon: <IoIosMail />,
      path: "category",
    },
    {
      key: "sub6",
      label: "Sản Phẩm",
      icon: <IoIosMail />,
      path: "product",
    },
    {
      key: "sub7",
      label: "Sản Phẩm Bán Chạy",
      icon: <IoIosMail />,
      path: "product-best-sell",
    },
    {
      key: "sub8",
      label: "Hàng Tồn Kho",
      icon: <IoIosMail />,
      path: "inventory",
    },
  ];
  return (
    <>
      <div className="admin">
        <Row gutter={[48, 48]}>
          <Col xxl={6} xl={6} lg={8} md={10} sm={10} xs={10}>
            <div className="admin__menu">
              <Menu mode="inline">
                {items.map((item) => (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.path}><span>{item.label}</span></Link>
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </Col>
          <Col xxl={18} xl={18} lg={16} md={14} sm={14} xs={14}>
            <div className="admin__content">
              <Outlet />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AdminPage;
