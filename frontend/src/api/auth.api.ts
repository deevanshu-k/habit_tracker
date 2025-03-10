import axiosInstance from "./api_instance";

const authService = {
    signup: (
        first_name: string,
        last_name: string,
        email: string,
        password: string
    ) =>
        axiosInstance.post("/api/auth/local/signup", {
            first_name,
            last_name,
            email,
            password,
        }),
    signupVerifyOtp: (email: string, otp: string) =>
        axiosInstance.post("/api/auth/local/signup/verify", { email, otp }),
    signin: (email: string, password: string) =>
        axiosInstance.post("/api/auth/local/signin", { email, password }),
    signOut: () => axiosInstance.post("/api/auth/signout"),
};

export default authService;
