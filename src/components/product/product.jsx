import { Button, Row, Col, Modal, Rate, notification, message } from "antd";
import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import "./product.scss";
import { categoryContext } from "../context/categoryContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/action";
const Product = (props) => {
  const { product } = props;
  const { category } = useContext(categoryContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productDetail, setProductDetail] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const filterProductDetail = productDetail
    ? product.find((item) => item.id === productDetail)
    : product;

  const [open, setOpen] = useState(false);
  const handleOK = () => {
    setOpen(false);
  };
  const handleCancel = () => {};
  const itemPerPage = 4;
  const handleClickReturn = () => {
    setTimeout(() => {
      setCurrentIndex((item) => (item + itemPerPage) % product.length);
    }, 500);
  };
  const handleClickNext = () => {
    setTimeout(() => {
      setCurrentIndex(
        (item) => (item - itemPerPage + product.length) % product.length
      );
    }, 500);
  };
  const handleAddToCart = (item) => {
    if (cart.some((itemcart) => itemcart.id === item.id)) {
      message.warning(`${item.name} đã có trong giỏ hàng`);
      return;
    }
    dispatch(addToCart(item.id, item));
    message.success(`${item.name} đã được thêm vào giỏ hàng thành công`);
  };
  const handleShowModal = (item) => {
    setOpen(true);
    setProductDetail(item.id);
  };
  const filterProductCategory = productDetail
    ? category.find((item) => item.id === filterProductDetail.category_id)
    : product;
  return (
    <div>
      <Modal
        open={open}
        title="Chi tiết sản phẩm"
        onOk={handleOK}
        onCancel={handleCancel}
      >
        {filterProductDetail ? (
          <div className="productDetail">
            <div className="productDetail__image">
              <img
                src={filterProductDetail.image}
                alt={filterProductDetail.name}
              />
              <div className="productDetail__name">
                {filterProductDetail.name}
              </div>
            </div>
            <div className="productDetail__about">
              <div className="productDetail__type">
                Xu hướng sản phẩm: Sản phẩm bán chạy
              </div>
              <div className="productDetail__cate">
                Loại sản phẩm :{" "}
                {filterProductCategory
                  ? filterProductCategory.name
                  : "Loading category..."}
              </div>
              <div className="productDetail__oldprice">
                Giá cũ: {filterProductDetail.price} đ
              </div>
              <div className="productDetail__discount">
                Giảm giá: {filterProductDetail.discount} %
              </div>
              <div className="productDetail__newprice">
                Giá mới:{" "}
                {((100 - filterProductDetail.discount) / 100) *
                  filterProductDetail.price}{" "}
                đ
              </div>
              <div className="productDetail__des">
                Mô tả: {filterProductDetail.description}
              </div>
              <div>
                Đánh giá: <Rate allowHalf={true} defaultValue={4.5} />
              </div>
            </div>
          </div>
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
      </Modal>
      <div className="product">
        <div className="btn btn-return" onClick={handleClickReturn}>
          <FaArrowLeft />
        </div>
        <div className="btn btn-next" onClick={handleClickNext}>
          <FaArrowRight />
        </div>
        <Row justify={"center"} align={"middle"} gutter={[24, 24]}>
          {product
            .slice(currentIndex, currentIndex + itemPerPage)
            .map((item) => (
              <Col key={item.id} xxl={6} xl={6} lg={8} md={8} sm={12} xs={12}>
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
                    <Button onClick={() => handleAddToCart(item)}>
                      Thêm giỏ hàng
                    </Button>
                  </div>
                  <div className="icon">
                    <div
                      className="icon1"
                      onClick={() => handleShowModal(item)}
                    >
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
      </div>
    </div>
  );
};

export default Product;
