import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000/v1", // Example base URL
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosInstance;
