const { where } = require("sequelize");
const db = require("../models/index");

const getCategoryService = async () => {
  try {
    const category = await db.Category.findAll();
    return category;
  } catch (error) {
    console.log("Loi >>>: ", error);
    throw error;
  }
};

const createProductService = async (
  name,
  image,
  quantity,
  category_id,
  description,
  price,
  discount
) => {
  try {
    const newProduct = await db.Product.create({
      name,
      image,
      quantity,
      category_id,
      description,
      price,
      discount,
    });
    return newProduct;
  } catch (error) {
    console.log("Loi khi tao moi san pham >>>: ", error);
    throw error;
  }
};

const createCategoryService = async (id, name, description, image) => {
  try {
    const newCategory = db.Category.create({
      name,
      description,
      image,
    });
    return newCategory;
  } catch (error) {
    console.log("Loi khi tao moi san pham >>>: ", error);
    throw error;
  }
};

const getProductService = async () => {
  try {
    const product = await db.Product.findAll();
    return product;
  } catch (error) {
    console.log("Loi >>>: ", error);
    throw error;
  }
};

const createImageService = async (file) => {
  try {
    const newImage = await db.Image.create({
      file,
    });
    return newImage;
  } catch (error) {
    console.log("Loi khi tao moi anh >>>: ", error);
    throw error;
  }
};

const deleteProductService = async (id) => {
  try {
    const product = await db.Product.destroy({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    console.log("Loi khi xoa san pham>>>: ", error);
    throw error;
  }
};

const updateProductService = async (id, quantity) => {
  try {
    
  } catch (error) {
    
  }
}

const deleteCategoryService = async (id) => {
  try {
    const category = await db.Category.destroy({
      where: { id },
    });
    return category;
  } catch (error) {
    console.log("loi khi xoa san pham: ", error);
    throw error;
  }
};


module.exports = {
  getCategoryService,
  createProductService,
  getProductService,
  deleteProductService,
  createImageService,
  deleteCategoryService,
  createCategoryService,
};
