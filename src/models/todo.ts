export interface ITodo {
    id: string;
    name: string;
    completed: boolean;
}

export interface ActionCreators {
    type: string;
    payload: ITodo | string;
    name?: string;
}

export interface ITodoApp {
    search: string;
    filter: string;
    todoList: ITodo[];
}
