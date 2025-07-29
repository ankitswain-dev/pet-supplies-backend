import axios from "../api/axios";
import { addToCart, getCartByUser, removeFromCart } from "./cartService";

export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const res = await axios.post("/cart/add", { userId, productId, quantity });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
export const getCartByUser = async (userId) => {
  try {
    const res = await axios.get(`/cart/${userId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
export const removeFromCart = async (cartId) => {
  try {
    const res = await axios.delete(`/cart/${cartId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
