import React, { useContext, useEffect, useState } from "react";
import Category from "../../components/catetory/category";
import { Carousel, Col, Row, Button, Input, Form} from "antd";
import { productContext } from "../../components/context/productContext";
import Confetti from "react-confetti";
import Product from "../../components/product/product";
import "./homePage.scss";
import { IoRocketOutline, IoWalletOutline } from "react-icons/io5";
import { MdOutlineChangeCircle } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { CiGift } from "react-icons/ci";

const HomePage = () => {
  const { product } = useContext(productContext);
  const [showConfetti, setShowConfetti] = useState(false);
  console.log(product);
  
  useEffect(() => {
    if (localStorage.getItem("showConfetti") === "true") {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        localStorage.removeItem("showConfetti");
      }, 6000);
    }
  }, []);
  return (
    <div>
      {showConfetti && <Confetti />}

      <Category />
      <div className="Content">
        <div className="Content1">
          <Row>
            <Col span={24}>
              <Carousel arrows autoplay autoplaySpeed={2000}>
                <div className="Content1__image">
                  <img src="images/carousel/iphone.webp" alt="carousel" />
                </div>
                <div className="Content1__image">
                  <img src="images/carousel/iphone2.png" alt="carousel" />
                </div>
                <div className="Content1__image">
                  <img src="images/carousel/macbook.jpg" alt="carousel" />
                </div>
                <div className="Content1__image">
                  <img src="images/carousel/macbook2.jpg" alt="carousel" />
                </div>
              </Carousel>
            </Col>
          </Row>
        </div>
        <div className="Content2">
          <div className="Content2__Product">
            <h1 style={{ margin: "20px 0px 20px 0px" }}>Sản Phẩm</h1>
            <Product product={product} />
          </div>
          <div className="Content2__Sale">
            <h1 style={{ margin: "20px 0px 20px 0px" }}>Sản Phẩm Bán Chạy</h1>
            <Product product={product.filter((item) => item.sold >= 25)} />
          </div>
          <div className="Content2__SupperDiscount">
            <h1 style={{ margin: "20px 0px 20px 0px" }}>Sản Phẩm Siêu Sale</h1>
            <Product product={product.filter((item) => item.discount >= 15)} />
          </div>
        </div>
        <div className="Content3">
          <div className="Content3__image">
            <img src="images/carousel/macbook.jpg" alt="macbook" />
          </div>
          <div className="Content3__content">
            <div className="title1">Đăng ký với EnndmeShop ngay!</div>
            <div className="title2">
              Tận hưởng dịch vụ mua sắm an toàn, tiện lợi, nhanh chóng cùng với
              nhiều dịch vụ khác áp dụng cho toàn bộ đối tượng. Đến với chúng
              tôi để tìm được sản phẩm công nghệ phù hợp với bản thân và gia
              đinh...
            </div>
            <div className="form">
              <Input placeholder="Địa chỉ email" />
              <Button>Gửi</Button>
            </div>
            <div>
              <div className="contact">
                <img src="images/carousel/appstore.png" alt="appstore" />
              </div>
            </div>
          </div>
        </div>
        <div className="Content4">
          <div className="Content4__block">
            <div className="Content4__detail">
              <div className="icon">
                <IoRocketOutline />
              </div>
              <div className="title">
                <h3>Giao hàng miễn phí</h3>
                <p>Dành cho các đơn hàng trên 10 triệu</p>
              </div>
            </div>
            <div className="Content4__detail">
              <div className="icon">
                <MdOutlineChangeCircle />
              </div>
              <div className="title">
                <h3>Đổi trả 30 ngày</h3>
                <p>Nếu sản phẩm có vấn đề</p>
              </div>
            </div>
            <div className="Content4__detail">
              <div className="icon">
                <IoWalletOutline />
              </div>
              <div className="title">
                <h3>Thanh toán an toàn</h3>
                <p>Tích hợp các phương thức thanh toán mới nhất</p>
              </div>
            </div>
            <div className="Content4__detail">
              <div className="icon">
                <IoIosPhonePortrait />
              </div>
              <div className="title">
                <h3>Hỗ trợ 24/7</h3>
                <p>Đường dây nóng (+84)987465321</p>
              </div>
            </div>
            <div className="Content4__detail">
              <div className="icon">
                <CiGift />
              </div>
              <div className="title">
                <h3>Dịch vụ quà tặng</h3>
                <p>Hỗ trợ nhiều voucher giảm giá sốc</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Content5">
          <h2>Liên hệ</h2>
          <Form>
            <div className="contact">
              <div className="information">
                <div className="name">
                  <Input placeholder="Họ tên" />
                </div>
                <div>
                  <Input placeholder="Email" />
                </div>
              </div>
              <div className="title">
                <Input placeholder="Tiêu đề" className="title1" />
                <Input placeholder="Nội dung tin nhắn" />
              </div>
            </div>
            <Button>Gửi</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
