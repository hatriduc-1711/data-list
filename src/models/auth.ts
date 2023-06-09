export interface ILoginParams {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface ILoginValidation {
    email: string;
    password: string;
}

export interface ISignUpParams {
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    gender: string;
    region: string;
    state: string;
}

export interface ILocationParams {
    id: string | number;
    name: string;
    pid: number | null;
}

export interface IStateParams {
    id: string | number;
    name: string;
    pid: number | null;
}
