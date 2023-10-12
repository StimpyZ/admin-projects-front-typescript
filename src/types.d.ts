interface AuthState {
    _id: string
    nombre: string
    email: string
    token: string
}

interface FormState {
    email: string
    password: string
    nombre: string
    password2: string
}

export interface AlertState {
    msg: string
    error: boolean
}

export interface AuthInitialState {
    auth: AuthState
    loading: boolean
    form: FormState
    confirmedAccount: boolean
    alert: AlertState
    validToken: boolean
    isPasswordChanged: boolean
}
export interface ContextProviderProps {
    children: JSX.Element | JSX.Element[]
}

export interface AuthContextProps {
    form: FormState
    confirmedAccount?: boolean
    auth: AuthState
    alert: AlertState
    isPasswordChanged: boolean
    validToken: boolean
    handleLogout?: () => void
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmitLogin?: (e: React.FormEvent<HTMLFormElement>) => void
    handleSubmitRegister?: (e: React.FormEvent<HTMLFormElement>) => void
    confirmAccount: (id: string) => void
    handleSendEmail: (e: React.FormEvent<HTMLFormElement>) => void
    handleChangePassword: (
        e: React.FormEvent<HTMLFormElement>,
        token: string
    ) => void
    proofToken: (token: string) => void
}

export interface ProjectContextProps {
    task: Tarea
    loading: boolean
    project: Project
    projects: Project[]
    formProject: ProjectForm
    taskForm: TaskForm
    modal: boolean
    searchModal: boolean
    colaboradores: Colaboradore
    handelGetProjects: () => void
    handelGetProject: (id: string) => void
    handleCreateProject: (project: Partial<Project>) => void
    handleChange: (
        e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => void
    handleEditProject: (id: string, project: Partial<Project>) => void
    handleFillFormProject: (project: Project) => void
    handleDeleteProject: (id: string) => void
    handleChangeTask: (
        e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => void
    handleSubmitCreateTask: (task: Partial<Tarea>) => void
    handleModal: () => void
    handleModalEditTask: (task: Tarea) => void
    handleFillTaskForm: (task: Tarea) => void
    handleEditTask: (id: string, task: Partial<Tarea>) => void
    handleSearchModal: () => void
    handleDeleteTask: (id: string) => void
    handleChangeStateTask: (id: string) => void
    handleSubmitSearchCollaborator: (email: string) => void
    handleAddCollaborator: (email: string) => void
    handleDeleteCollaborator: (id: string) => void
}

export interface Project {
    _id: string
    nombre: string
    descripcion: string
    fechaEntrega: string
    cliente: string
    colaboradores: Colaboradore[]
    creador: string
    createdAt: string
    updatedAt: string
    __v: number
    tareas: Tarea[]
}

export interface Colaboradore {
    _id: string
    nombre: string
    email: string
}

export interface Tarea {
    _id: string
    nombre: string
    descripcion: string
    estado: boolean
    fechaEntrega: string
    prioridad: string
    proyecto: string
    createdAt: string
    updatedAt: string
    __v: number
    completado: Completado
}

export interface Completado {
    _id: string
    nombre: string
}

export interface ProjectForm {
    nombre: string
    descripcion: string
    fechaEntrega: string
    cliente: string
}

export interface TaskForm {
    nombre: string
    descripcion: string
    fechaEntrega: string
    prioridad: string
    proyecto?: string
}

export interface ProjecInitialtState {
    projects: Project[]
    project: Project
    loading: boolean
    formProject: ProjectForm
    taskForm: TaskForm
    modal: boolean
    task: Tarea
    colaboradores: Colaboradore
}
