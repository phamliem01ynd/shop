const { where, Op } = require("sequelize");
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

const updateProductService = async (id, updateData) => {
  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      return { message: "Sản phẩm không tồn tại", success: false };
    }

    await product.update(updateData);
    return { message: "Cập nhật sản phẩm thành công", success: true, product };
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm", error);
    return { message: "Lỗi khi cập nhật sản phẩm", success: false, error };
  }
};

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

const getFindProductService = async (id) => {
  try {
    const product = await db.Product.findAll({
      where: {
        id: { [Op.like]: `%${id}%` }, // ✅ Đổi 'title' thành 'name'
      },
    });
    return product;
  } catch (error) {
    console.error("loi khi tim san pham: ", error);
    throw error;
  }
};

const search_PaginatorProductService = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  try {
    const offset = (page - 1) * limit;
    // Bây giờ Product và Op đã được định nghĩa và có thể sử dụng
    const { count, rows } = await db.Product.findAndCountAll({
      where: {
        // Đảm bảo search không phải là null/undefined trước khi dùng Op.like
        ...(search && { name: { [Op.like]: `${search}%` } }),
        // Hoặc nếu muốn tìm kiếm rỗng khi search rỗng:
        // name: { [Op.like]: `${search || ''}%` },
      },
      limit: parseInt(limit) || 10, // Đảm bảo limit là số nguyên
      offset: parseInt(offset) || 0, // Đảm bảo offset là số nguyên
    });
    return {
      // Đổi tên 'product' thành 'data' để khớp với frontend Angular mong đợi
      data: rows, // <-- Đổi tên ở đây
      total: count,
      totalPage: Math.ceil(count / (parseInt(limit) || 10)), // Đảm bảo không chia cho 0
      currentPage: parseInt(page) || 1,
    };
  } catch (error) {
    console.error("Loi khi tim kiem san pham ", error);
    throw error; // Ném lỗi ra để controller bắt được
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
  updateProductService,
  search_PaginatorProductService,
  getFindProductService,
};
