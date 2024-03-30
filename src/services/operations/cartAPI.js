import toast from "react-hot-toast";
import { cartEndpoints } from "../apis";
import { apiConnector } from "../apiConector";

const { ADD_TO_CART, 
    REMOVE_FROM_CART, 
    GET_ENTIRE_CART, 
    RESET_CART 
    } =
  cartEndpoints;

export const addTocart = async (courseId, token) => {
const toastId = toast.loading("Loading...");
let res = false;
  try {
    const response = await apiConnector("POST", ADD_TO_CART, courseId, {
      Authorization: `Bearer ${token}`,
    });
  
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Course Added To Cart");
    res = true;
  } catch (error) {
    toast.error("Course already in Cart");
  }
  toast.dismiss(toastId);
  return res;
};
  
export const removeFromcart = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", REMOVE_FROM_CART, courseId, {
      Authorization: `Bearer ${token}`,
    });
  
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  
    toast.success("Course Removed from Cart");
  } catch (error) {
    toast.error("Could not remove course from cart");
  }
  toast.dismiss(toastId);
};
  
export const getEntireCart = async (token) => {
  const toastId = toast.loading("Loading...");
  let cart;
  try {
    const response = await apiConnector("GET", GET_ENTIRE_CART, null, {
      Authorization: `Bearer ${token}`,
    });
  
    if (!response) {
      throw new Error(response.data.message);
    }
    cart = response;
    return cart;
  } catch (error) {
  } finally {
    toast.dismiss(toastId);
  }
};
  
export const resetCart = async (token) => {
  try {
    const response = await apiConnector("POST", RESET_CART, null, {
      Authorization: `Bearer ${token}`,
    });
  
    if (!response) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};