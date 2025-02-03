import { UserDetail } from "../store/store.type";
import axiosInstance from "./api_instance";

const userService = {
    getUser: async (): Promise<UserDetail> => {
        const res = await axiosInstance.get("/api/user/");
        return res.data.data;
    },
};

export default userService;
