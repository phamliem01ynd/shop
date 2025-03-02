import React, { useContext, useState } from "react";
import { Row, Col, Button, message } from "antd";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
const ProductShop = (props) => {
  const { product } = props;
  const [currentIndex, setCurrentIndex] = useState(16);
  const handleSeeMore = () => {
    setCurrentIndex(product.length);
  };
  return (
    <>
      <div className="product">
        <Row justify={"center"} align={"middle"} gutter={[16, 16]}>
          {product.slice(0, currentIndex).map((item) => (
            <Col key={item.id} xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
              <div className="product__list">
                <div className="product__image">
                  <Link to={"/product/" + item?.name}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                </div>
                <div className="product__title">
                  <div className="name">{item.name}</div>
                  <div className="quantity">Số lượng: {item.quantity}</div>
                  <div className="product__price">
                    <div className="oldprice">
                      {item.price} <div>VND</div>
                    </div>
                    <div className="newprice">
                      {((100 - item.discount) / 100) * item.price}
                      <div>VND</div>
                    </div>
                  </div>
                  <Button>Thêm giỏ hàng</Button>
                </div>
                <div className="icon">
                  <div className="icon1">
                    <FaRegEye />
                  </div>
                  <div className="icon2">
                    <MdFavoriteBorder />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Button className="see-more" onClick={handleSeeMore} style={{marginTop:"20px"}}>
          Xem Thêm
        </Button>
      </div>
    </>
  );
};

export default ProductShop;
