import axios from "./axiosCustomer";

const createUserApi = async (email, name, password) => {
  try {
    const url_api = "/api/register";
    const data = {
      email,
      name,
      password,
    };
    return axios.post(url_api, data);
  } catch (error) {
    console.log("loi khi call API >>>:", error);
    throw error;
  }
};

const loginApi = async (email, password) => {
  try {
    const URL_API = "api/login";
    const data = {
      email,
      password,
    };
    return axios.post(URL_API, data);
  } catch (error) {
    console.log("loi khi call Api >>>:", error);
  }
};

const getProducts = async () => {
  try {
    const url_api = "/api/product";
    return axios.get(url_api);
  } catch (error) {
    console.log("loi khi call API >>>:", error);
    throw error;
  }
};
const getCategories = async () => {
  try {
    const url_api = "/api/category";
    return axios.get(url_api);
  } catch (error) {
    console.log("loi khi call API >>>:", error);
    throw error;
  }
};
const getUser = async () => {
  try {
    const url_api = "/api/user";
    return axios.get(url_api);
  } catch (error) {
    console.log("loi khi call api >>>:", error);
    throw error;
  }
};
const createProductApi = async (
  name,
  image,
  quantity,
  category_id,
  description,
  price,
  discount
) => {
  try {
    const URL_API = "api/createproduct";
    const data = {
      name,
      image,
      quantity,
      category_id,
      description,
      price,
      discount,
    };
    return axios.post(URL_API, data);
  } catch (error) {
    console.log("loi khi call API >>>: ", error);
  }
};

const deleteProduct = async (id) => {
  try {
    const URL_API = `api/product/${id}`;
    return axios.delete(URL_API);
  } catch (error) {
    console.log("loi khi call API >>>: ", error);
  }
};

const deleteCategory = async (id) => {
  try {
    const url_api = `api/category/${id}`;
    return axios.delete(url_api);
  } catch (error) {
    console.log("loi khi call api >>>:", error);
    throw error;
  }
};

const createCategory = async (name, description, image) => {
  try {
    const url_api = "api/createcategory";
    const data = {
      name,
      description,
      image,
    };
    return axios.post(url_api, data);
  } catch (error) {
    console.log("loi khi call api >>>:", error);
    throw error;
  }
};
export {
  createUserApi,
  getProducts,
  getCategories,
  loginApi,
  getUser,
  createProductApi,
  deleteProduct,
  deleteCategory,
  createCategory,
};
