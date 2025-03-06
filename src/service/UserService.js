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
      return { messege: `email ${email} nay da ton tai` };
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
          email: user.email,
          name: user.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          access_token,
          user: {
            email: user.email,
            name: user.name,
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



module.exports = { getUserService, createUserService, checkLogin };
