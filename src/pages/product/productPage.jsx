import React, { useContext, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productContext } from "../../components/context/productContext";
import "./productPage.scss";
import { Button, Form, Input, Rate } from "antd";
import Product from "../../components/product/product";
import { AiOutlineGlobal } from "react-icons/ai";
import { RiRefund2Line } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { categoryContext } from "../../components/context/categoryContext";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../../components/redux/action";
import { languageContext} from "../../components/context/languageContext";
function ProductPage() {
  const params = useParams();
  console.log(params);
  const { category } = useContext(categoryContext);
  const { product } = useContext(productContext);
  const [isZoom, setIsZoom] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const Ref = useRef();
  const { translations } = useContext(languageContext)
  const handleAddQuantity = () => {

  };
  const handleReduceQuantity = () => {

  };

  console.log(category);
  const filteredProduct = product.find(
    (item) => item.name === params.productName
  );
  const filteredCategory = filteredProduct
    ? category.find((item) => item.id === filteredProduct.category_id)
    : null;
  const filteredCatoryProduct = product
    ? category.find((item) => item.id === product.category_id)
    : null;
  return (
    <>
      <div style={{ margin: "20px 0px 20px 20px" }}>
        <Link to="/" style={{ color: "black", fontWeight: "500" }}>
          Home /{" "}
        </Link>
        {params.productName}
      </div>
      {filteredProduct ? (
        <>
          <div className="productPage">
            <div className="productPage__originalPhoto">
              <img
                src={filteredProduct.image}
                alt={filteredProduct.name}
                className={isZoom ? "zoom" : ""}
                onClick={() => setIsZoom(!isZoom)}
              />
            </div>
            <div className="productPage__title">
              <h2>{filteredProduct.name}</h2>
              <p>
                {filteredCategory
                  ? filteredCategory.name
                  : "Loading category..."}
              </p>
              <div className="rate">
                <Rate
                  disabled
                  defaultValue={4.5}
                  allowHalf
                  style={{ color: "red" }}
                />
                <span className="buy">lượt mua:05</span>
                <span>Lượt thích:06</span>
              </div>
              <p style={{ color: "green" }}>Trạng thái: còn hàng</p>
              <div className="price">
                <span>{filteredProduct.price}đ</span>
                <span>
                  {((100 - filteredProduct.discount) / 100) *
                    filteredProduct.price}
                  đ
                </span>
              </div>
              <div className="quantity">
                <span>Số lượng: </span>{" "}
                <Button onClick={() => handleReduceQuantity(filteredProduct)}>
                  -
                </Button>
                <Input
                  readOnly
                  defaultValue={1}
                  inputRef={Ref}
                  style={{ textAlign: "center" }}
                ></Input>
                <Button onClick={() => handleAddQuantity(filteredProduct)}>
                  +
                </Button>
                <span style={{color:'red'}}>{filteredProduct.quantity} sản phẩm có sẵn</span>
              </div>
              <div>
                <Button style={{ background: "#000", color: "#fff" }}>
                  <Link to="/cart">Thêm vào giỏ hàng</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="ProductPageDetail">
            <div className="description"> 
              <h2>Mô tả sản phẩm</h2>
              <span>{filteredProduct.description}</span>
              <h2>Chính sách</h2>
              <p>
                Tại Việt Nam, về chính sách bảo hành và đổi trả của Apple, "sẽ
                được áp dụng chung" theo các điều khoản được liệt kê dưới đây:
              </p>
              <p>
                1) Chính sách chung:
                https://www.apple.com/legal/warranty/products/warranty-rest-of-apac-vietnamese.html
              </p>
              <p>
                2) Chính sách cho phụ kiện:
                https://www.apple.com/legal/warranty/products/accessory-warranty-vietnam.html
              </p>
              <p>
                3) Các trung tâm bảo hành Apple ủy quyền tại Việt Nam:
                https://getsupport.apple.com/repair-locations?locale=vi_VN
              </p>
            </div>
            <div className="contact">
              <div className="contact1">
                <h2>Quyền lợi</h2>
                <div className="title">
                  <AiOutlineGlobal className="icon" />
                  <span>Vận chuyển toàn quốc</span>
                </div>
                <div className="title">
                  <RiRefund2Line className="icon" />
                  <span>Hoàn trả miễn phí trong 7 ngày nếu đủ điều kiện</span>
                </div>
                <div className="title">
                  <RiBillLine className="icon" />
                  <span>Nhà cung cấp đưa ra hóa đơn cho sản phẩm này</span>
                </div>
                <div className="title">
                  <IoWalletOutline className="icon" />
                  <span>Thanh toán trực tuyến hoặc nhận hàng</span>
                </div>
              </div>
              <div className="contact2">
                <h2>Liên Hệ</h2>
                <Form>
                  <Input placeholder="Nhập email" />
                  <div>
                    <Button>Gửi</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Không tìm thấy sản phẩm</p>
      )}
      <div className="productPage2">
        <h2>Sản phẩm</h2>
        <Product product={product} />
      </div>
    </>
  );
}

export default ProductPage;
