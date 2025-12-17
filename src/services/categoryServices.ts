import axios from "axios";
import type { CategoryData } from "../types/Category.types";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchCategories = async () => {
  const res = await axios.get(`${apiUrl}/api/v1/category`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const apiDeleteCategory = async (id: string) => {
  const res = await axios.delete(`${apiUrl}/api/v1/category/delete/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const fetchOneCategory = async (id: string) => {
  const res = await axios.get(`${apiUrl}/api/v1/category/${id}`, {
    withCredentials: true,
  });
  return res.data.category;
};

export const editCategory = async (id: string, data: CategoryData) => {
  const res = await axios.patch(`${apiUrl}/api/v1/category/edit/${id}`, data, {
    withCredentials: true,
  });
  return res.data.data;
};

export const createCategory = async (data: CategoryData) => {
  const res = await axios.post(`${apiUrl}/api/v1/category/new`, data, {
    withCredentials: true,
  });
  return res.data.data;
};