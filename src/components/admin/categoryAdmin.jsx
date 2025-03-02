import React, { useEffect, useState } from "react";
import ImageUpload from "./imageUpload";
import { createCategory, deleteCategory, getCategories } from "../../utils/api";
import { Button, Form, Input, message, Modal, notification, Table } from "antd";
import TextArea from "antd/es/input/TextArea";

function Category() {
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [imageCategory, setImageCategory] = useState("");
  useEffect(() => {
    const fetchApiCategory = async () => {
      const result = await getCategories();
      setCategory(result);
    };
    fetchApiCategory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        await deleteCategory(id);
        message.success("Xóa sản phẩm thành công");
        setCategory(category.filter((category) => category.id !== id));
      } catch (error) {
        message.error("Lỗi khi xóa sản phẩm");
      }
    }
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleModal = () => {
    setOpen(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOnChangeImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImageUrl(URL.createObjectURL(file));
    setImageCategory(file);
  };

  const onFinish = async (value) => {
    const { name, description } = value;
    let image = imageCategory;
    if (imageCategory) {
      const formData = new FormData();
      formData.append("file", imageCategory);
      formData.append("upload_preset", "enndme-product");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dq35gn0cg/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (result) {
        image = result.url;
      }
    }
    const resultt = await createCategory(image, name, description);
    if (resultt) {
      notification.success({
        message: "Thêm sản phẩm",
        description: "Thêm sản phẩm thành công",
      });
    } else {
      notification.error({
        message: "Thêm sản phẩm",
        description: "Thêm sản phẩm thất bại",
      });
    }
  };

  const columns = [
    {
      title: "id_Category",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img
          src={image}
          alt="Category"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
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
    <>
      <Modal
        title="Thêm danh mục"
        width={1000}
        loading={loading}
        open={open}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div className="product__modal1">
          <Form name="addCategory" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm" },
              ]}
            >
              <Input type="text" placeholder="Nhập tên sản phẩm" />
            </Form.Item>
            <Form.Item name={"image"} label="image">
              <Input type="file" onChange={handleOnChangeImage} />
            </Form.Item>
            {setImageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt="imageCategory"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </>
            ) : (
              "Không tìm thấy ảnh"
            )}
            <Form.Item label="Mô tả" name="description">
              <TextArea
                name="description"
                cols={30}
                rows={4}
                placeholder="mô tả sản phẩm"
              />
            </Form.Item>
            <Form.Item label={null} style={{ textAlign: "center" }}>
              <Button
                style={{
                  background: "black",
                  color: "white",
                  fontWeight: "bold",
                }}
                type="primary"
                htmlType="submit"
              >
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div className="uploadCategory">
        <Button
          style={{ background: "black", color: "white", fontWeight: "bold" }}
          onClick={handleModal}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <div className="categoryTable">
        <Table dataSource={category} rowKey={"id"} columns={columns} bordered />
      </div>
    </>
  );
}

export default Category;
