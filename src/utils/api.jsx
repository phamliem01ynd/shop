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
export { createUserApi, getProducts, getCategories };
