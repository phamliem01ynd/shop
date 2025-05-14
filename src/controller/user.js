const db = require("../models/index");
const { Op } = require("sequelize");
const {
  getUserService,
  createUserService,
  checkLogin,
  postUserService,
} = require("../service/UserService");

const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const result = await createUserService(email, name, password);
    return res.status(200).json(result);
  } catch (error) {
    console.error("loi ", error);
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await checkLogin(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.log("loi >>>:", error);
    res.json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const result = await getUserService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "không lấy được dữ liệu",
      error: error,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const search = req.query.search || ""; // Lấy từ khóa tìm kiếm từ query params

    if (!search) {
      return res
        .status(400)
        .json({ message: "Thiếu tham số tìm kiếm 'search'" });
    }

    console.log("🔍 Search Query:", search); // Kiểm tra từ khóa tìm kiếm

    const users = await db.User.findAll({
      where: {
        email: { [Op.like]: `%${search}%` }, // ✅ Đổi 'title' thành 'name'
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Lỗi tìm kiếm:", error);
    res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm", error });
    throw error;
  }
};

const postUser = async (req, res) => {
  try {
    const { name, email, address, phone, password, group_id } = req.body;
    const result = await postUserService(
      name,
      email,
      address,
      phone,
      password,
      group_id
    );
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi tạo sản phẩm" });
  }
};

const search_PaginatorUser = async (req, res) => {
  try {
    console.log("Backend received query params:", req.query); // Log tham số nhận được
    const users = await search_PaginatorUser(req.query);
    console.log("Backend service returned:", users); // Log kết quả service trả về
    res.status(200).json(users);
  } catch (error) {
    // Log thêm lỗi ở đây nếu muốn
    console.error(
      "Error in search_PaginatorProduct controller:",
      error.message
    );
    res.status(500).json({ message: "Lỗi khi tim kiem nguoi dung" });
  }
};

module.exports = {
  getUser,
  createUser,
  handleLogin,
  postUser,
  searchUser,
  search_PaginatorUser,
};
