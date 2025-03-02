import { Button, Form, Input, Modal, notification, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import "./productAdmin.scss";
import { createProductApi } from '../../utils/api';
import { getCategories } from '../../utils/api';
import GetProduct from './getProduct';
function ProductAdmin() {
  const { TextArea } = Input;
  const [ open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageProduct, setImageProduct] = useState('');
  const [categories, setCategories] = useState([]);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setImageProduct(file);
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  const handleOk = () => {
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  const handleModal = () => {
    setOpen(true);
    setTimeout(() => {
      setLoading(false)
    },1000)
  }

  const onFinish = async (values) => {
    const { name, quantity, category_id, description, price, discount } = values;
    let image = imageProduct;
    if (imageProduct) {
      const formData = new FormData();
      formData.append("file", imageProduct);
      formData.append("upload_preset", "enndme-product");
      const response = await fetch('https://api.cloudinary.com/v1_1/dq35gn0cg/image/upload', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result) {
       image = result.url;
      }    
    }
    const resultt = await createProductApi(name, image, quantity, category_id, description, price, discount);
    if(resultt){
      notification.success({
        message: "Thêm sản phẩm",
        description: "Thêm sản phẩm thành công"
      })
    } else {
      notification.error({
        message: "Thêm sản phẩm",
        description: "Thêm sản phẩm thất bại"
    })
  }
  };
  
  return (
    <div className='product'>
      <div className='product__add'>
        <Button style={{background: 'black', color: 'white', fontWeight: 'bold'}} onClick={handleModal}>Thêm sản phẩm</Button>
      </div>
      <Modal title = "Thêm sản phẩm"
      width={1000}
      loading = {loading}
      open = {open}
      onCancel={handleCancel}
      onOk={handleOk}
      >
        <Form name="addProduct"
        layout='vertical'
        onFinish={onFinish}
        >
          <div className='product__modal'>
          <div className='product__modal1'>
          <Form.Item label="Tên sản phẩm"
          name='name'
          rules={[{required: true, message: 'Vui lòng nhập tên sản phẩm'}]}>
            <Input type='text' placeholder='Nhập tên sản phẩm'/>
            </Form.Item>
            <Form.Item label="Số lượng"
          name='quantity'
          rules={[{required: true, message: 'Vui lòng nhập số lượng'}]}>
            <Input type='text' placeholder='số lượng'/>
            </Form.Item>
            <Form.Item label="Danh mục"
          name='category_id'>
            <Select placeholder="Chọn danh mục">
                  {categories.map(category => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
            </Form.Item>
            <Form.Item label='Mô tả' name='description'>  
              <TextArea name='description' cols={30} rows={4} placeholder='mô tả sản phẩm'/>
            </Form.Item>  
          </div>
          <div className='product__modal2'>
          <Form.Item label="Giá bán"
          name='price'
          rules={[{required: true, message: 'Vui lòng nhập giá sản phẩm'}]}>
            <Input addonAfter='VND' type='text' placeholder='Giá sản phẩm'/>
            </Form.Item>
            <Form.Item label="Giảm giá"
          name='discount'
          rules={[{required: true, message: 'Vui lòng phần trăm giảm giá'}]}>
            <Input addonAfter = '%' type='text' placeholder='giảm giá'/>
            </Form.Item>
            <Form.Item label="Ảnh sản phẩm"
          name='imagee'>
            <Input type='file' onChange={handleImageChange}/>
            </Form.Item>            
            {imageUrl ? 
              <img src={imageUrl} alt='product' style={{width: '100px', height: '100px', objectFit: 'cover'}}/>: (<p>hình ảnh không hợp lệ</p>)}
          </div>
          </div>
          <Form.Item label={null} style={{textAlign: 'center'}}>  
              <Button style={{
                background: 'black',
                color: 'white',
                fontWeight: 'bold',
              }} type='primary' htmlType='submit'>Thêm sản phẩm</Button>
            </Form.Item>
        </Form>

      </Modal>
      <GetProduct/>
    </div>
    
  )
}

export default ProductAdmin