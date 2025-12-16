import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchTags = async () => {
  const res = await axios.get(`${apiUrl}/api/v1/tag`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const createTag = async (data: FormData) => {
  const res = await axios.post(`${apiUrl}/api/v1/tag/new`, data, {
    withCredentials: true,
  });
  return res.data.data;
};