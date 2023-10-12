import { type Project, type ProjecInitialtState, type ProjectForm, type TaskForm, type Tarea, type Colaboradore } from '../types'

export enum ACTION_PROJECT_TYPES {
    GET_PROJECTS = 'GET_PROJECTS',
    GET_PROJECT = 'GET_PROJECT',
    LOADING = 'LOADING',
    CLEAR_PROJECT = 'CLEAR_PROJECT',
    HANDLE_CHANGE = 'HANDLE_CHANGE',
    NEW_PROJECT = 'NEW_PROJECT',
    EDIT_PROJECT = 'EDIT_PROJECT',
    FILL_FORM_PROJECT = 'FILL_FORM_PROJECT',
    DELETE_PROJECT = 'DELETE_PROJECT',
    NEW_TASK = 'NEW_TASK',
    HANDLE_CHANGE_TASK_FORM = 'HANDLE_CHANGE_TASK_FORM',
    CLEAR_TASK_FORM = 'CLEAR_TASK_FORM',
    HANDLE_MODAL = 'HANDLE_MODAL',
    SET_TASK = 'SET_TASK',
    FILL_FORM_TASK = 'FILL_FORM_TASK',
    EDIT_TASK = 'EDIT_TASK',
    DELETE_TASK = 'DELETE_TASK',
    COMPLETE_TASK = 'COMPLETE_TASK',
    SEARCH_COLLABORATOR = 'SEARCH_COLLABORATOR',
    ADD_COLLABORATOR = 'ADD_COLLABORATOR',
    CLEAR_COLLABORATOR = 'CLEAR_COLLABORATOR',
    DELETE_COLLABORATOR = 'DELETE_COLLABORATOR'
}

export const initialState: ProjecInitialtState = {
    projects: [],
    project: {
        _id: '',
        nombre: '',
        descripcion: '',
        fechaEntrega: '',
        cliente: '',
        colaboradores: [],
        creador: '',
        createdAt: '',
        updatedAt: '',
        tareas: [],
        __v: 0
    },
    formProject: {
        nombre: '',
        descripcion: '',
        fechaEntrega: '',
        cliente: ''
    },
    taskForm: {
        nombre: '',
        descripcion: '',
        fechaEntrega: '',
        prioridad: '',
        proyecto: ''
    },
    loading: true,
    modal: false,
    task: {
        __v: 0,
        _id: '',
        completado: {
            _id: '',
            nombre: ''
        },
        createdAt: '',
        descripcion: '',
        estado: false,
        fechaEntrega: '',
        nombre: '',
        prioridad: '',
        proyecto: '',
        updatedAt: ''
    },
    colaboradores: {
        _id: '',
        nombre: '',
        email: ''
    }
}

type ProjectActions =
    | {
        type: ACTION_PROJECT_TYPES.GET_PROJECTS
        payload: { projects: Project[] }
    }
    | {
        type: ACTION_PROJECT_TYPES.GET_PROJECT
        payload: { project: Project }
    }
    | { type: ACTION_PROJECT_TYPES.LOADING }
    | { type: ACTION_PROJECT_TYPES.CLEAR_PROJECT }
    | { type: ACTION_PROJECT_TYPES.HANDLE_CHANGE, payload: Partial<ProjectForm> }
    | { type: ACTION_PROJECT_TYPES.NEW_PROJECT, payload: Project }
    | { type: ACTION_PROJECT_TYPES.EDIT_PROJECT, payload: Project }
    | { type: ACTION_PROJECT_TYPES.FILL_FORM_PROJECT, payload: Project }
    | { type: ACTION_PROJECT_TYPES.DELETE_PROJECT, payload: Project }
    | { type: ACTION_PROJECT_TYPES.HANDLE_CHANGE_TASK_FORM, payload: Partial<TaskForm> }
    | { type: ACTION_PROJECT_TYPES.NEW_TASK, payload: Tarea }
    | { type: ACTION_PROJECT_TYPES.CLEAR_TASK_FORM }
    | { type: ACTION_PROJECT_TYPES.HANDLE_MODAL }
    | { type: ACTION_PROJECT_TYPES.SET_TASK, payload: Tarea }
    | { type: ACTION_PROJECT_TYPES.FILL_FORM_TASK, payload: Tarea }
    | { type: ACTION_PROJECT_TYPES.EDIT_TASK, payload: Tarea }
    | { type: ACTION_PROJECT_TYPES.DELETE_TASK, payload: Tarea[] }
    | { type: ACTION_PROJECT_TYPES.COMPLETE_TASK, payload: Tarea[] }
    | { type: ACTION_PROJECT_TYPES.SEARCH_COLLABORATOR, payload: Colaboradore }
    | { type: ACTION_PROJECT_TYPES.ADD_COLLABORATOR, payload: Colaboradore }
    | { type: ACTION_PROJECT_TYPES.CLEAR_COLLABORATOR }
    | { type: ACTION_PROJECT_TYPES.DELETE_COLLABORATOR, payload: Colaboradore[] }
export const projectReducer = (
    state: ProjecInitialtState,
    action: ProjectActions
): ProjecInitialtState => {

    switch (action.type) {

        case ACTION_PROJECT_TYPES.GET_PROJECTS:
            return {
                ...state,
                projects: action.payload.projects,
                loading: false
            }
        case ACTION_PROJECT_TYPES.GET_PROJECT:
            return {
                ...state,
                project: action.payload.project,
                loading: false
            }
        case ACTION_PROJECT_TYPES.LOADING:
            return {
                ...state,
                loading: true
            }
        case ACTION_PROJECT_TYPES.CLEAR_PROJECT:
            return {
                ...state,
                project: initialState.project,
                formProject: initialState.formProject,
                taskForm: initialState.taskForm
            }
        case ACTION_PROJECT_TYPES.HANDLE_CHANGE:
            return {
                ...state,
                formProject: {
                    ...state.formProject,
                    ...action.payload
                }

            }
        case ACTION_PROJECT_TYPES.CLEAR_TASK_FORM:
            return {
                ...state,
                taskForm: initialState.taskForm
            }
        case ACTION_PROJECT_TYPES.HANDLE_CHANGE_TASK_FORM:
            return {
                ...state,
                taskForm: {
                    ...state.taskForm,
                    ...action.payload
                }

            }
        case ACTION_PROJECT_TYPES.NEW_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                loading: false
            }
        case ACTION_PROJECT_TYPES.EDIT_PROJECT:
            return {
                ...state,
                projects: state.projects.map(project => project._id === action.payload._id ? action.payload : project),
                project: action.payload,
                loading: false
            }
        case ACTION_PROJECT_TYPES.FILL_FORM_PROJECT:
            return {
                ...state,
                formProject: {
                    nombre: action.payload.nombre,
                    descripcion: action.payload.descripcion,
                    fechaEntrega: action.payload.fechaEntrega.split('T')[0],
                    cliente: action.payload.cliente
                }
            }
        case ACTION_PROJECT_TYPES.DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload._id),
                project: initialState.project,
                loading: false
            }
        case ACTION_PROJECT_TYPES.NEW_TASK:
            return {
                ...state,
                project: {
                    ...state.project,
                    tareas: [...state.project.tareas, action.payload]
                },
                loading: false
            }
        case ACTION_PROJECT_TYPES.HANDLE_MODAL:
            return {
                ...state,
                modal: !state.modal
            }
        case ACTION_PROJECT_TYPES.SET_TASK:
            return {
                ...state,
                task: action.payload
            }
        case ACTION_PROJECT_TYPES.FILL_FORM_TASK:
            return {
                ...state,
                taskForm: {
                    nombre: action.payload.nombre,
                    descripcion: action.payload.descripcion,
                    fechaEntrega: action.payload.fechaEntrega.split('T')[0],
                    prioridad: action.payload.prioridad,
                    proyecto: action.payload.proyecto
                }
            }
        case ACTION_PROJECT_TYPES.EDIT_TASK:
            return {
                ...state,
                project: {
                    ...state.project,
                    tareas: state.project.tareas.map(task => task._id === action.payload._id ? action.payload : task)
                },
                loading: false
            }
        case ACTION_PROJECT_TYPES.DELETE_TASK:
            return {
                ...state,
                project: {
                    ...state.project,
                    tareas: action.payload
                },
                loading: false
            }
        case ACTION_PROJECT_TYPES.COMPLETE_TASK:
            return {
                ...state,
                project: {
                    ...state.project,
                    tareas: action.payload
                },
                loading: false
            }
        case ACTION_PROJECT_TYPES.SEARCH_COLLABORATOR:
            return {
                ...state,
                colaboradores: action.payload
            }
        case ACTION_PROJECT_TYPES.ADD_COLLABORATOR:
            return {
                ...state,
                project: {
                    ...state.project,
                    colaboradores: [...state.project.colaboradores, action.payload]
                }
            }
        case ACTION_PROJECT_TYPES.CLEAR_COLLABORATOR:
            return {
                ...state,
                colaboradores: initialState.colaboradores
            }
        case ACTION_PROJECT_TYPES.DELETE_COLLABORATOR:
            return {
                ...state,
                project: {
                    ...state.project,
                    colaboradores: action.payload
                },
                loading: false
            }

        default:
            return state

    }

}
