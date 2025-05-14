const {
  getCategoryService,
  createProductService,
  getProductService,
  deleteProductService,
  createCategoryService,
  deleteCategoryService,
  updateProductService,
  search_PaginatorProductService,
  getFindProductService,
} = require("../service/ProductService");
const db = require("../models/index");
const { Op } = require("sequelize");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ được phép upload file ảnh!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      // Sửa lại message rõ hơn
      return res.status(400).json({ message: "Vui lòng upload ảnh sản phẩm!" });
    } else {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURL = "data:" + req.file.mimetype + ";base64," + b64;
      const cloudinaryResult = await cloudinary.uploader.upload(dataURL, {
        resource_type: "auto",
        folder: "products",
      });

      const {
        name,
        price,
        description,
        category_id,
        status,
        discount,
        quantity, // Giữ lại nếu frontend gửi JSON string
        // Bỏ sold khỏi đây
      } = req.body;

      const newProductData = {
        name: name,
        price: parseFloat(price),
        description: description,
        category_id: parseInt(category_id),
        status: parseInt(status),
        discount: parseFloat(discount),
        quantity: JSON.parse(quantity), // Giả định frontend gửi JSON string
        sold: 0, // Khởi tạo sold = 0
        image: cloudinaryResult.secure_url,
      };

      const result = await db.Product.create(newProductData);

      // ----> THÊM RESPONSE KHI THÀNH CÔNG <----
      res.status(201).json(result); // Gửi lại sản phẩm vừa tạo với status 201 Created
    } // Đóng khối else
  } catch (error) {
    console.error("Error creating product with image:", error);
    if (
      error.http_code === 400 &&
      error.message.includes("Invalid image file")
    ) {
      return res.status(400).json({ message: "File ảnh không hợp lệ." });
    }
    // Bắt lỗi JSON.parse nếu quantity không đúng định dạng
    if (error instanceof SyntaxError && error.message.includes("JSON.parse")) {
      return res
        .status(400)
        .json({ message: "Dữ liệu quantity không đúng định dạng JSON." });
    }
    res
      .status(500)
      .json({ message: "Lỗi server khi tạo sản phẩm", error: error.message });
  }
};

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
    console.log("req.user >>>: ", req.user);
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
const updateProduct = async (req, res) => {
  try {
    const result = await updateProductService(req.params.id, req.body);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm" });
  }
};

// Bên trong controller search_PaginatorProduct
const search_PaginatorProduct = async (req, res) => {
  try {
    console.log("Backend received query params:", req.query); // Log tham số nhận được
    const products = await search_PaginatorProductService(req.query);
    console.log("Backend service returned:", products); // Log kết quả service trả về
    res.status(200).json(products);
  } catch (error) {
    // Log thêm lỗi ở đây nếu muốn
    console.error(
      "Error in search_PaginatorProduct controller:",
      error.message
    );
    res.status(500).json({ message: "Lỗi khi tim kiem sản phẩm" });
  }
};

const getFindProduct = async (req, res) => {
  try {
    const id = req.query.id || ""; // Lấy từ khóa tìm kiếm từ query params

    if (!id) {
      return res.status(400).json({ message: "Thiếu tham số tìm kiếm 'id'" });
    }

    console.log("🔍 Search Query:", id); // Kiểm tra từ khóa tìm kiếm

    const products = await db.Product.findOne({
      where: {
        // Điều kiện: cột 'id' phải bằng chính xác giá trị productId
        id: id,
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Lỗi tìm kiếm:", error);
    res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm", error });
    throw error;
  }
};

const searchProduct = async (req, res) => {
  try {
    const search = req.query.search || ""; // Lấy từ khóa tìm kiếm từ query params

    // if (!search) {
    //   return res
    //     .status(400)
    //     .json({ message: "Thiếu tham số tìm kiếm 'search'" });
    // }

    // console.log("🔍 Search Query:", search); 

    const products = await db.Product.findAll({
      where: {
        name: { [Op.like]: `%${search}%` }, // ✅ Đổi 'title' thành 'name'
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Lỗi tìm kiếm:", error);
    res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm", error });
    throw error;  
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
  updateProduct,
  search_PaginatorProduct,
  searchProduct,
  getFindProduct,
  upload,
  uploadImage,
};
