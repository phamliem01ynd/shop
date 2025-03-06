const connection = require("../config/connectDB");
const { getUserService, createUserService, checkLogin } = require("../service/UserService");

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
    res.status(200).json(result)
  } catch (error) {
    console.log("loi >>>:",error);
    res.json(error);
  } 
}

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

module.exports = { getUser, createUser, handleLogin };
