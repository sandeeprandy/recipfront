import axios from "axios";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: "https://recipback.onrender.com", // Replace with your actual base URL
  timeout: 10000, // Optional: set a timeout for requests
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

export default axiosInstance;
