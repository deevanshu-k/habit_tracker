import axiosInstance from "./api_instance";

export interface GetTodayTodosResponse {
    id: string;
    title: string;
    date: number;
    month: number;
    year: number;
    is_done: boolean;
}

const todoService = {
    getTodayTodos: async (): Promise<GetTodayTodosResponse> => {
        const res = await axiosInstance.get(`/api/todo/today`);
        return res.data.data;
    },
};

export default todoService;
