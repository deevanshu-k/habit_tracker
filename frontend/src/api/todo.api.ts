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

export interface UpdateTodoResponse {
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
    updateTodo: async (
        todoId: string,
        _title: string,
        _is_done: boolean
    ): Promise<UpdateTodoResponse> => {
        const res = await axiosInstance.put(`/api/todo/${todoId}`, {
            title: _title,
            is_done: _is_done,
        });
        return res.data.data;
    },
};

export default todoService;
