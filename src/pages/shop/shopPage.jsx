import { Col, Row, Select } from "antd";
import "./shopPage.scss";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { categoryContext } from "../../components/context/categoryContext";
import ProductShop from "../../components/product/productShop";
import "./shopPage.scss";
import { productContext } from "../../components/context/productContext";
const ShopPage = () => {
  const { category } = useContext(categoryContext);
  const { product } = useContext(productContext);
  const [ categoryProduct, setCategoryProduct] = useState(null);
  const [ sortPrice, setSortPrice] = useState(null);
  const handleClickCategory = (value) => {
    setCategoryProduct(value)
  };
  const handleOnChange = (value) => {
    setSortPrice(value)  
  }
  
  const filterCategoryProduct = categoryProduct ? product.filter((item) => item.category_id === categoryProduct) : product;
  const sortProduct = [...filterCategoryProduct].sort((a,b) => {
    if (sortPrice === "Giá tăng dần"){
      return (
        ((100 - a.discount) / 100) * a.price -
        ((100 - b.discount) / 100) * b.price
      );
    }
    if (sortPrice === "Giá giảm dần"){
      return (
        ((100 - b.discount) / 100) * b.price -
        ((100 - a.discount) / 100) * a.price
      );
    }
  })
  const handleShowAllProduct = () => {
    setCategoryProduct(null)
  }
  return (
    <div>
      <div>
        <Link to={"/"}>Home</Link>/ Shop
      </div>
      <div className="shop">
        <Row justify={"center"} align={"middle"} gutter={[48, 48]}>
          <Col xxl={6} xl={6} lg={6} md={10} sm={10} xs={10}>
            <div className="categoryFilter">
              <h2>Danh mục sản phẩm</h2>
              {category
                ? category.map((item, index) => (
                    <div
                      className="category__list"
                      key={item.id}
                      onClick={() => handleClickCategory(item.id)}
                    >
                      <span>{item.name}</span>
                    </div>
                  ))
                : "Không tìm thấy sản phẩm"}
            </div>
            <div className="productFilter">
              <h2>Lọc sản phẩm</h2>
              <div className="allProduct" onClick={handleShowAllProduct}>
                <span>Tất cả sản phẩm</span>
              </div>
              <div className="sortPrice">
                <span className="price">Giá sản phẩm</span>
                <Select
                  defaultValue={"Giá sản phẩm"}
                  style={{ width: 250 }}
                  onChange={handleOnChange}
                >
                  <Select.Option value="Giá tăng dần">
                    Giá tăng dần
                  </Select.Option>
                  <Select.Option value="Giá giảm dần">
                    Giá giảm dần
                  </Select.Option>
                </Select>
              </div>
            </div>
          </Col>
          <Col xxl={18} xl={18} lg={18} md={14} sm={14} xs={14}>
            <div className="shop__image">
              <img src="images/carousel/macbook.jpg" alt="img"/>
            </div>
            <div className="productShop">
              <ProductShop product = { sortProduct }/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ShopPage;
