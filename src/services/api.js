import axios from "axios";

// Shared Axios client for all frontend requests to the local backend API.
const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

export default api;
