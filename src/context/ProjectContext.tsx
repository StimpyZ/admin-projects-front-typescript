import { createContext } from 'react'
import { type ProjectContextProps, type ContextProviderProps } from '../types'
import useProjectReducer from '../hooks/useProjectReducer'

export const ProjectContext = createContext({} as ProjectContextProps)

export const ProjectProvider = ({ children }: ContextProviderProps) => {

    const {
        handelGetProjects,
        loading,
        project,
        projects,
        formProject,
        taskForm,
        modal,
        task,
        searchModal,
        colaboradores,
        handelGetProject,
        handleCreateProject,
        handleChange,
        handleEditProject,
        handleFillFormProject,
        handleDeleteProject,
        handleChangeTask,
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

    } = useProjectReducer()

    return (
        <ProjectContext.Provider
            value={{
                loading,
                project,
                projects,
                formProject,
                taskForm,
                modal,
                task,
                searchModal,
                colaboradores,
                handelGetProjects,
                handelGetProject,
                handleCreateProject,
                handleChange,
                handleEditProject,
                handleFillFormProject,
                handleDeleteProject,
                handleChangeTask,
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
            }}
        >
            {children}
        </ProjectContext.Provider>
    )

}
