import axios from "axios";
import type { TagData } from "../types/Tag.types";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchTags = async () => {
  const res = await axios.get(`${apiUrl}/api/v1/tag`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const createTag = async (data: TagData) => {
  const res = await axios.post(`${apiUrl}/api/v1/tag/new`, data, {
    withCredentials: true,
  });
  return res.data.data;
};

export const apiDeleteTag = async (id: string) => {
  const res = await axios.delete(`${apiUrl}/api/v1/tag/delete/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const fetchOneTag = async (id: string) => {
  const res = await axios.get(`${apiUrl}/api/v1/tag/${id}`, {
    withCredentials: true,
  });
  return res.data.tag;
};

export const editTag = async (id: string, data: TagData) => {
  const res = await axios.patch(`${apiUrl}/api/v1/tag/edit/${id}`, data, {
    withCredentials: true,
  });
  return res.data.data;
};