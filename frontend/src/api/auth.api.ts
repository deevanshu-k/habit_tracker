import axiosInstance from "./api_instance";

const authService = {
    signin: (email: string, password: string) =>
        axiosInstance.post("/api/auth/local/signin", { email, password }),
    signOut: () => axiosInstance.post("/api/auth/signout"),
};

export default authService;
