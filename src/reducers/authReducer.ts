import {
    type AuthInitialState,
    type AlertState,
    type AuthState,
    type FormState
} from '../types'

export enum ACTION_AUTH_TYPES {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    LOADING = 'LOADING',
    HANDLE_CHANGE = 'HANDLE_CHANGE',
    REGISTER = 'HANDLE_SUBMIT_REGISTER',
    CONFIRM_ACCOUNT = 'CONFIRM_ACCOUNT',
    CONFIRM_ACCOUNT_ERROR = 'CONFIRM_ACCOUNT_ERROR',
    CLEAN_FORM_STATE = 'CLEAN_FORM_STATE',
    VALID_TOKEN = 'VALID_TOKEN',
    PASSWORD_CHANGED = 'PASSWORD_CHANGED'
}

export const initialState: AuthInitialState = {
    auth: {
        _id: '',
        nombre: '',
        email: '',
        token: ''
    },
    form: {
        email: '',
        password: '',
        nombre: '',
        password2: ''
    },
    alert: {
        msg: '',
        error: false
    },
    loading: true,
    confirmedAccount: false,
    validToken: false,
    isPasswordChanged: false
}

type AuthActions =
    | { type: ACTION_AUTH_TYPES.LOGIN, payload: { auth: AuthState } }
    | { type: ACTION_AUTH_TYPES.LOGOUT }
    | { type: ACTION_AUTH_TYPES.LOADING }
    | { type: ACTION_AUTH_TYPES.HANDLE_CHANGE, payload: Partial<FormState> }
    | { type: ACTION_AUTH_TYPES.REGISTER }
    | {
        type: ACTION_AUTH_TYPES.CONFIRM_ACCOUNT
        payload: { alert: AlertState }
    }
    | {
        type: ACTION_AUTH_TYPES.CONFIRM_ACCOUNT_ERROR
        payload: { alert: AlertState }
    }
    | { type: ACTION_AUTH_TYPES.CLEAN_FORM_STATE }
    | { type: ACTION_AUTH_TYPES.VALID_TOKEN }
    | { type: ACTION_AUTH_TYPES.PASSWORD_CHANGED }
export const authReducer = (
    state: AuthInitialState,
    action: AuthActions
): AuthInitialState => {

    switch (action.type) {

        case ACTION_AUTH_TYPES.LOGIN:
            return {
                ...state,
                auth: action.payload.auth,
                loading: false
            }
        case ACTION_AUTH_TYPES.REGISTER:
            return {
                ...state,
                loading: false
            }
        case ACTION_AUTH_TYPES.LOGOUT:
            return {
                ...state,
                auth: {
                    _id: '',
                    nombre: '',
                    email: '',
                    token: ''
                },
                loading: false,
                confirmedAccount: false,
                validToken: false,
                isPasswordChanged: false,
                form: {
                    email: '',
                    password: '',
                    nombre: '',
                    password2: ''
                }
            }
        case ACTION_AUTH_TYPES.LOADING: {

            return {
                ...state,
                loading: true
            }

        }
        case ACTION_AUTH_TYPES.HANDLE_CHANGE:
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload
                }
            }
        case ACTION_AUTH_TYPES.CONFIRM_ACCOUNT:
            return {
                ...state,
                confirmedAccount: true,
                alert: {
                    msg: action.payload.alert.msg,
                    error: action.payload.alert.error
                },
                loading: false
            }
        case ACTION_AUTH_TYPES.CONFIRM_ACCOUNT_ERROR:
            return {
                ...state,
                confirmedAccount: false,
                alert: {
                    msg: action.payload.alert.msg,
                    error: action.payload.alert.error
                },
                loading: false
            }
        case ACTION_AUTH_TYPES.CLEAN_FORM_STATE:
            return {
                ...state,
                form: {
                    email: '',
                    password: '',
                    nombre: '',
                    password2: ''
                }
            }
        case ACTION_AUTH_TYPES.VALID_TOKEN:
            return {
                ...state,
                validToken: true,
                loading: false
            }
        case ACTION_AUTH_TYPES.PASSWORD_CHANGED:
            return {
                ...state,
                isPasswordChanged: true,
                loading: false
            }
        default:
            return state

    }

}
