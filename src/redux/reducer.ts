import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import { ITodoApp } from '../models/todo';
import { StateDataTable } from '../models/dataTable';
import todoApp from './todoApp/todoAppReducer';
import dataTableReducer from './dataTable/dataTableReducer';

export interface AppState {
    todoApp: ITodoApp;
    dataTable: StateDataTable;
    router: RouterState;
    intl: IntlState;
    profile: AuthState;
}

export default function createRootReducer(history: History) {
    return combineReducers({
        todoApp: todoApp,
        dataTable: dataTableReducer,
        router: connectRouter(history),
        intl: intlReducer,
        profile: authReducer,
    });
}
