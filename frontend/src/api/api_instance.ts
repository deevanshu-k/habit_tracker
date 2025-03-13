import axios from "axios";
import authInterceptor from "./interceptors/auth.interceptor";

export interface ResponseType<T> {
    code: number;
    message: string;
    data: T;
}

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000/v1", // Example base URL
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Add Interceptors
authInterceptor(axiosInstance);

export default axiosInstance;
