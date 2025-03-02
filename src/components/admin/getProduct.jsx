import React, { useEffect, useState } from 'react'
import { Table, Button, message } from "antd";
import { deleteProduct, getProducts } from '../../utils/api';
const GetProduct = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getProducts();
            setProduct(result);
        };
    fetchApi();
    }, [])

    const handleDelete = async (id) => {
      if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
          try {
              await deleteProduct(id);
              message.success('Xóa sản phẩm thành công');
              setProduct(product.filter(product => product.id !== id));
          } catch (error) {
              message.error('Lỗi khi xóa sản phẩm');
          }
      }
  }
    const columns = [
        {
          title: "id",
          dataIndex: "id",
        },
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
        },
        {
          title: "Category",
          dataIndex: "category_id",
        },
        {
          title: "Price",
          dataIndex: "price",
        },
        {
            title: "Discount",
            dataIndex: "discount",
          },
        {
          title: "Action",
          render: (text, record) => (
            <>
              <Button>Sửa</Button>
              <Button onClick={() => handleDelete(record.id)}>Xóa</Button>
            </>
          ),
        },
      ];

  return (
    <div>
        <Table
            className="table"
            rowKey={"id"}
            bordered
            dataSource={product}
            columns={columns}
        />

    </div>
  )
}

export default GetProduct