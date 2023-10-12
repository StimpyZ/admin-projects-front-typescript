import { useReducer, useState } from 'react'
import {
    ACTION_PROJECT_TYPES,
    initialState,
    projectReducer
} from '../reducers/projectReducer'
import axiosClient from '../config/axiosClient'
import { getAuthHeaders } from '../config/getHeaders'
import { ErrorAlert, SuccessAlert } from '../config/alerts'
import { type Tarea, type Project } from '../types'
import { useNavigate } from 'react-router-dom'

export default function useProjectReducer () {

    const [{ loading, project, projects, formProject, taskForm, modal, task, colaboradores }, dispatch] = useReducer(
        projectReducer,
        initialState
    )
    const [searchModal, setSearchModal] = useState(false)

    const navigate = useNavigate()
    const authHeaders = getAuthHeaders()

    const handelGetProjects = async () => {

        dispatch({ type: ACTION_PROJECT_TYPES.CLEAR_PROJECT })
        try {

            const { data } = await axiosClient('/proyectos', authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.GET_PROJECTS,
                payload: {
                    projects: data
                }
            })

        } catch (error: any) {

            console.log(error)

        }

    }

    const handelGetProject = async (id: string) => {

        dispatch({ type: ACTION_PROJECT_TYPES.LOADING })

        try {

            const { data } = await axiosClient(`/proyectos/${id}`, authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.GET_PROJECT,
                payload: {
                    project: data
                }
            })

        } catch (error: any) {

            console.log(error)

        }

    }

    const handleChange = (
        e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {

        e.preventDefault()

        dispatch({
            type: ACTION_PROJECT_TYPES.HANDLE_CHANGE,
            payload: {
                [e.target.name]: e.target.value
            }
        })

    }
    const handleChangeTask = (e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>
    ) => {

        e.preventDefault()

        dispatch({
            type: ACTION_PROJECT_TYPES.HANDLE_CHANGE_TASK_FORM,
            payload: {
                [e.target.name]: e.target.value
            }
        })

    }

    const handleCreateProject = async (
        project: Partial<Project>
    ) => {

        if (
            [
                project.nombre,
                project.descripcion,
                project.fechaEntrega,
                project.cliente
            ].includes('')
        ) {

            ErrorAlert({
                error: 'All fields are required'
            })
            return

        }
        dispatch({ type: ACTION_PROJECT_TYPES.CLEAR_PROJECT })
        dispatch({ type: ACTION_PROJECT_TYPES.LOADING })

        try {

            const { data } = await axiosClient.post(
                '/proyectos',
                project,
                authHeaders
            )

            dispatch({
                type: ACTION_PROJECT_TYPES.NEW_PROJECT,
                payload: data
            })

            SuccessAlert({
                title: 'Project created',
                text: 'Project created successfully'
            })

            navigate('/proyectos')

        } catch (error: any) {

            console.log(error)

        }

    }

    const handleEditProject = async (id: string, project: Partial<Project>) => {

        if (
            [
                project.nombre,
                project.descripcion,
                project.fechaEntrega,
                project.cliente
            ].includes('')
        ) {

            ErrorAlert({
                error: 'All fields are required'
            })
            return

        }
        dispatch({ type: ACTION_PROJECT_TYPES.LOADING })
        try {

            const { data } = await axiosClient.put(`/proyectos/${id}`, project, authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.EDIT_PROJECT,
                payload: data
            })
            SuccessAlert({
                title: 'Project edited',
                text: 'Project edited successfully'
            })

        } catch (error: any) {

            console.log(error)

        }

        dispatch({ type: ACTION_PROJECT_TYPES.CLEAR_PROJECT })

    }

    const handleFillFormProject = (project: Project) => {

        dispatch({
            type: ACTION_PROJECT_TYPES.FILL_FORM_PROJECT,
            payload: project
        })

    }

    const handleDeleteProject = async (id: string) => {

        dispatch({ type: ACTION_PROJECT_TYPES.LOADING })

        try {

            const { data } = await axiosClient.delete(`/proyectos/${id}`, authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.DELETE_PROJECT,
                payload: data
            })

            SuccessAlert({
                title: 'Project deleted',
                text: 'Project deleted successfully'
            })
            navigate('/proyectos')

        } catch (error: any) {

            console.log(error)

        }

    }
    const handleSubmitCreateTask = async (task: Partial<Tarea>) => {

        if (
            [
                task.nombre,
                task.descripcion,
                task.fechaEntrega,
                task.prioridad
            ].includes('')
        ) {

            ErrorAlert({
                error: 'All fields are required'
            })
            return

        }

        try {

            const { data } = await axiosClient.post('/tareas', task, authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.NEW_TASK,
                payload: data
            })
            SuccessAlert({
                title: 'Task created',
                text: 'Task created successfully'
            })

            handleModal()

        } catch (error: any) {

            console.log(error)

        }

        dispatch({ type: ACTION_PROJECT_TYPES.CLEAR_TASK_FORM })

    }

    const handleModal = () => {

        dispatch({ type: ACTION_PROJECT_TYPES.CLEAR_TASK_FORM })
        dispatch({ type: ACTION_PROJECT_TYPES.HANDLE_MODAL })

    }

    const handleModalEditTask = (task: Tarea) => {

        dispatch({ type: ACTION_PROJECT_TYPES.HANDLE_MODAL })
        dispatch({
            type: ACTION_PROJECT_TYPES.SET_TASK,
            payload: task
        })

    }

    const handleFillTaskForm = (task: Tarea) => {

        dispatch({
            type: ACTION_PROJECT_TYPES.FILL_FORM_TASK,
            payload: task
        })

    }

    const handleEditTask = async (id: string, task: Partial<Tarea>) => {

        if (
            [
                task.nombre,
                task.descripcion,
                task.fechaEntrega,
                task.prioridad
            ].includes('')
        ) {

            ErrorAlert({
                error: 'All fields are required'
            })
            return

        }

        try {

            const { data } = await axiosClient.put(`/tareas/${id}`, task, authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.EDIT_TASK,
                payload: data
            })
            SuccessAlert({
                title: 'Task edited',
                text: 'Task edited successfully'
            })
            dispatch({ type: ACTION_PROJECT_TYPES.HANDLE_MODAL })

        } catch (error: any) {

            console.log(error)

        }
        dispatch({ type: ACTION_PROJECT_TYPES.CLEAR_TASK_FORM })

    }

    const handleDeleteTask = async (id: string) => {

        try {

            await axiosClient.delete(`/tareas/${id}`, authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.DELETE_TASK,
                payload: project.tareas.filter((task) => task._id !== id)
            })
            SuccessAlert({
                title: 'Task deleted',
                text: 'Task deleted successfully'
            })

        } catch (error: any) {

            console.log(error)

        }

    }

    const handleChangeStateTask = async (id: string) => {

        try {

            const { data } = await axiosClient.post(`/tareas/estado/${id}`, {}, authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.COMPLETE_TASK,
                payload: project.tareas.map((task) => task._id === id ? data : task)
            })
            SuccessAlert({
                title: 'Task edited',
                text: 'Task edited successfully'
            })

        } catch (error: any) {

            console.log(error)

        }

    }

    const handleSearchModal = () => {

        setSearchModal(!searchModal)

    }

    const handleSubmitSearchCollaborator = async (email: string) => {

        if (email === '') {

            ErrorAlert({
                error: 'Email is required'
            })
            return

        }
        try {

            const { data } = await axiosClient.post('/proyectos/colaboradores', { email }, authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.SEARCH_COLLABORATOR,
                payload: data
            })

        } catch (error: any) {

        }

    }

    const handleAddCollaborator = async (email: string) => {

        try {

            await axiosClient.post(`/proyectos/colaboradores/${project._id}`, { email }, authHeaders)
            SuccessAlert({
                title: 'Collaborator added',
                text: 'Collaborator added successfully'
            })
            navigate(`/proyectos/${project._id}`)

        } catch (error: any) {

            console.log(error)
            ErrorAlert({
                error: error.response.data.msg
            })

        }
        dispatch({ type: ACTION_PROJECT_TYPES.CLEAR_COLLABORATOR })

    }

    const handleDeleteCollaborator = async (id: string) => {

        try {

            await axiosClient.post(`/proyectos/eliminar-colaborador/${project._id}`, { id }, authHeaders)
            dispatch({
                type: ACTION_PROJECT_TYPES.DELETE_COLLABORATOR,
                payload: project.colaboradores.filter((colaborador) => colaborador._id !== id)
            })
            SuccessAlert({
                title: 'Collaborator deleted',
                text: 'Collaborator deleted successfully'
            })

        } catch (error: any) {

            console.log(error)

        }

    }

    return {
        task,
        loading,
        project,
        projects,
        formProject,
        taskForm,
        modal,
        searchModal,
        colaboradores,
        handleChangeTask,
        handelGetProjects,
        handelGetProject,
        handleCreateProject,
        handleChange,
        handleEditProject,
        handleFillFormProject,
        handleDeleteProject,
        handleSubmitCreateTask,
        handleModalEditTask,
        handleModal,
        handleFillTaskForm,
        handleEditTask,
        handleSearchModal,
        handleDeleteTask,
        handleChangeStateTask,
        handleSubmitSearchCollaborator,
        handleAddCollaborator,
        handleDeleteCollaborator
    }

}
