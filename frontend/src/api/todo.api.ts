import axiosInstance from "./api_instance";

export interface GetTodayTodosResponse {
    id: string;
    title: string;
    date: number;
    month: number;
    year: number;
    is_done: boolean;
}

export interface CreateTodoResponse {
    id: string;
    title: string;
    date: number;
    month: number;
    year: number;
    is_done: boolean;
}

const todoService = {
    createTodo: async (_title: string): Promise<CreateTodoResponse> => {
        const res = await axiosInstance.post("/api/todo", {
            title: _title,
        });
        return res.data.data;
    },
    getTodayTodos: async (): Promise<GetTodayTodosResponse[]> => {
        const res = await axiosInstance.get(`/api/todo/today`);
        return res.data.data;
    },
};

export default todoService;
