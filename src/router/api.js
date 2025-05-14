const express = require("express");
const {
  getUser,
  createUser,
  handleLogin,
  postUser,
  searchUser,
  search_PaginatorUser,
} = require("../controller/user");
const auth = require("../middleware/auth");
const {
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
} = require("../controller/product");
const logJwtMiddleware = require("../middleware/jwt");
const router = express.Router();

router.all("*", auth);

router.get("/user", getUser);
router.post("/user/register", createUser);
router.post("/user/login", handleLogin);
router.put("/product/update/:id", updateProduct);
router.get("/category", getCategory);
router.post("/product/create", createProduct);
router.get("/product", getProduct);
router.delete("/product/delete/:id", deleteProduct);
router.post("/createimage", createImage);
router.delete("/category/:id", deleteCategory);
router.post("/createcategory", createCategory);
router.post("/user/create", postUser);
router.get("/product/search_Paginatorproduct", search_PaginatorProduct);
router.get("/product/searchProduct", searchProduct);
router.get("/user/searchUser", searchUser);
router.get("/user/search_PaginatorUser", search_PaginatorUser);
router.get("/product/id", logJwtMiddleware, getFindProduct);
router.post("/product/create-with-image", upload.single("image"), uploadImage);

module.exports = router;
