import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export const getAllImages = (album) => API.get(`/images?album=${album}`);
export const getOneImage = (id) => API.get(`/images/${id}`);
export const createImage = (newImage) => API.post("/images", newImage);
export const updateImage = (id, updatedImage) =>
  API.patch(`/images/${id}`, updatedImage);
export const deleteImage = (id) => API.delete(`/images/${id}`);

export const register = (newUser) => API.post("/users/register", newUser);
export const login = (existingUser) => API.post("/users/login", existingUser);
