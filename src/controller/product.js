const {
  getCategoryService,
  createProductService,
  getProductService,
  deleteProductService,
  createCategoryService,
  deleteCategoryService,
} = require("../service/ProductService");
const getCategory = async (req, res) => {
  try {
    const category = await getCategoryService();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await getProductService();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, image, quantity, category_id, description, price, discount } =
      req.body;
    const result = await createProductService(
      name,
      image,
      quantity,
      category_id,
      description,
      price,
      discount
    );
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi tạo sản phẩm" });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const result = await createCategoryService(name, description, image);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi thêm danh mục" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await deleteProductService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "loi khi xoa san pham" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const result = await deleteCategoryService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "loi khi xoa san pham" });
  }
};

const createImage = async (req, res) => {
  try {
    const { file } = req.body;
    const result = await createImageService(file);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi tạo ảnh" });
  }
};

module.exports = {
  getCategory,
  createProduct,
  getProduct,
  deleteProduct,
  createImage,
  deleteCategory,
  createCategory,
};
