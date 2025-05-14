const { where } = require("sequelize");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUserService = async (email, name, password) => {
  try {
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      return { EC: 1, messege: `email ${email} nay da ton tai` };
    }
    const hashpassword = await bcrypt.hash(password, saltRounds);

    // Tạo người dùng mới bằng Sequelize
    const newUser = await db.User.create({
      email,
      name,
      password: hashpassword,
    });

    return newUser; // Trả về đối tượng người dùng mới
  } catch (error) {
    console.error("Lỗi khi tạo mới người dùng !!!", error);
    throw error;
  }
};

const checkLogin = async (email1, password) => {
  try {
    const user = await db.User.findOne({ where: { email: email1 } });
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          access_token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
          },
        };
      } else {
        return { EC: 1, message: "Sai mật khẩu" };
      }
    } else {
      return {
        EC: 2,
        message: "Email không tồn tại",
      };
    }
  } catch (error) {
    console.log("Loi >>>:", error);
  }
};

const getUserService = async () => {
  try {
    const users = db.User.findAll();
    return users;
  } catch (error) {
    console.log("khong lay duoc du lieu >>>", error);
    throw error;
  }
};

const postUserService = async (
  name,
  email,
  address,
  phone,
  password,
  group_id
) => {
  try {
    const newProduct = await db.User.create({
      name,
      email,
      address,
      phone,
      password,
      group_id,
    });
    return newUser;
  } catch (error) {
    console.log("Loi khi tao moi san pham >>>: ", error);
    throw error;
  }
};

const search_PaginatorUserService = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  try {
    const offset = (page - 1) * limit;
    // Bây giờ Product và Op đã được định nghĩa và có thể sử dụng
    const { count, rows } = await db.User.findAndCountAll({
      where: {
        // Đảm bảo search không phải là null/undefined trước khi dùng Op.like
        ...(search && { email: { [Op.like]: `${search}%` } }),
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
  getUserService,
  createUserService,
  checkLogin,
  postUserService,
  search_PaginatorUserService,
};
