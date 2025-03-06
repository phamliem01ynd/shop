const express = require("express");
const { getUser, createUser, handleLogin } = require("../controller/user");
const auth = require("../middleware/auth");
const {
  getCategory,
  createProduct,
  getProduct,
  deleteProduct,
  createImage,
  deleteCategory,
  createCategory,
} = require("../controller/product");
const router = express.Router();

// router.all("*", auth);

router.get("/user", getUser);
router.post("/register", createUser);
router.post("/login", handleLogin);

router.get("/category", getCategory);
router.post("/createproduct", createProduct);
router.get("/product", getProduct);
router.delete("/product/:id", deleteProduct);
router.post("/createimage", createImage);
router.delete("/category/:id", deleteCategory);
router.post("/createcategory", createCategory);
module.exports = router;
