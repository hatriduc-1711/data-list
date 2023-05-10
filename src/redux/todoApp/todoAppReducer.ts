import { ActionCreators, ITodoApp } from '../../models/todo';

const initState = {
    search: '',
    filter: '1',
    todoList: [],
};

const todoApp = (state: ITodoApp = initState, action: ActionCreators) => {
    switch (action.type) {
        case 'addTodo':
            return {
                ...state,
                todoList: [...state.todoList, action.payload],
            };
        case 'deleteTodo':
            return {
                ...state,
                todoList: state.todoList.filter((todo) => todo.id !== action.payload),
            };
        case 'editTodo':
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.name === action.name ? { ...todo, name: action.payload } : todo,
                ),
            };
        case 'toggleCompletedTodo':
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
                ),
            };
        case 'searchTodo':
            return {
                ...state,
                search: action.payload,
            };
        default:
            return state;
    }
};

export default todoApp;
