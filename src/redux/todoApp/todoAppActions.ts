import { ITodo } from '../../models/todo';

export const addTodo = (data: ITodo) => {
    return {
        type: 'addTodo',
        payload: data,
    };
};

export const deleteTodo = (id: string) => {
    return {
        type: 'deleteTodo',
        payload: id,
    };
};

export const toggleCompletedTodo = (id: string) => {
    return {
        type: 'toggleCompletedTodo',
        payload: id,
    };
};

export const editTodo = (name: string, data: string) => {
    return {
        type: 'editTodo',
        payload: data,
        name: name,
    };
};

export const searchTodo = (data: string) => {
    return {
        type: 'searchTodo',
        payload: data,
    };
};
