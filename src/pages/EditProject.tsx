import { useContext, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { ProjectContext } from '../context/ProjectContext'
import CreateProjectForm from '../components/CreateProjectForm'
import { Navigate, useParams } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'
import { ConfirmAlert } from '../config/alerts'

export default function EditProject () {

    const { loading, project, handelGetProject, handleDeleteProject } = useContext(ProjectContext)
    const admin = useAdmin()
    const { id = '' } = useParams()

    useEffect(() => {

        if (id.length > 0) {

            handelGetProject(id)

        }

    }, [id])

    if (!admin) return <Navigate to="/proyectos" />
    return (
        <>
            {loading
                ? <Spinner />
                : (
                    <>
                        <div className="md:flex justify-between">
                            <h1 className="text-4xl font-bold">Editar proyecto: {project.nombre}</h1>

                            <button
                                onClick={() => ConfirmAlert({
                                    title: 'Eliminar proyecto',
                                    text: '¿Estas seguro de eliminar este proyecto?',
                                    handleConfirm: () => handleDeleteProject(id)
                                })}
                                className="flex max-w-[200px] items-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 transition-colors mt-5 md:mt-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                                <span>Eliminar proyecto</span>
                            </button>
                        </div>

                        <div className="mt-10 flex justify-center">
                            <CreateProjectForm />
                        </div>
                    </>)}
        </>
    )

}
