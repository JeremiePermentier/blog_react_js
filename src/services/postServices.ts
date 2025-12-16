import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchPosts = async () => {
  const res = await axios.get(`${apiUrl}/api/v1/posts`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const apiDeletePost = async (id: string) => {
  const res = await axios.delete(`${apiUrl}/api/v1/post/delete/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const fetchOnePost = async (id: string) => {
  const res = await axios.get(`${apiUrl}/api/v1/post/${id}`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const editPost = async (id: string, data: FormData) => {
  const res = await axios.patch(`${apiUrl}/api/v1/post/edit/${id}`, data, {
    withCredentials: true,
  });
  return res.data.data;
};

export const createPost = async (data: FormData) => {
  const res = await axios.post(`${apiUrl}/api/v1/post/new`, data, {
    withCredentials: true,
  });
  return res.data.data;
};
