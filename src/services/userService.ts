import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (data: any) => {
  const res = await axios.post(`${apiUrl}/api/v1/users/login`, data, {
    withCredentials: true,
  });
  return res.data.data;
};

export const register = async (data: any) => {
  const res = await axios.post(`${apiUrl}/api/v1/users/register`, data, {
    withCredentials: true,
  });
  return res.data.data;
};

export const logout = async () => {
  const res = await axios.post(`${apiUrl}/api/v1/users/logout`, {
    withCredentials: true,
  });
  return res.data.data;
};
