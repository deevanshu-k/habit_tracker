import { AxiosInstance } from "axios";
import store from "../../store/store";
import { logoutUserAction } from "../../store/user/user.action";

const authInterceptor = (axiosI: AxiosInstance) => {
    axiosI.interceptors.response.use(
        (res) => res,
        (error) => {
            if (error.response && error.response.status === 401) {
                store.dispatch(logoutUserAction());
            }
            return Promise.reject(error);
        }
    );
};

export default authInterceptor;
