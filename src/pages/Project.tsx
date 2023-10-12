import { useContext, useEffect } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import Spinner from '../components/Spinner'
import { Link, useParams } from 'react-router-dom'
import Task from '../components/Task'
import { EditProjectAdmin } from '../components/AdminComponents'
import useAdmin from '../hooks/useAdmin'
import Collaborators from '../components/Collaborators'
import ModalFormTask from '../components/ModalFormTask'

export default function Project () {

    const { loading, project, handelGetProject, handleModal, modal } = useContext(ProjectContext)
    const admin = useAdmin()
    const { id = '' } = useParams()

    useEffect(() => {

        handelGetProject(id)

    }, [])
    return (
        <>
            {loading
                ? (
                    <Spinner />
                )
                : (
                    <>
                        {admin && (
                            <EditProjectAdmin nombre={project.nombre} id={project._id} />
                        )}
                        {admin && (
                            <button
                                onClick={handleModal}
                                className="flex max-w-[180px] items-center gap-2 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 transition-colors mt-7"
                            >
                            Crear tarea
                            </button>
                        )}
                        <p className="font-bold text-xl mt-10">
                        Tareas del proyecto
                        </p>
                        <div className="bg-white shadow mt-10 overflow-y-auto max-h-[447px]">
                            {(project.tareas?.length > 0)
                                ? (
                                    project.tareas?.map((task) => (
                                        <Task key={task._id} task={task} />
                                    ))
                                )
                                : (
                                    <p className="text-center my-5 p-10">
                                Aun no hay tareas asignadas al proyecto
                                    </p>
                                )}
                        </div>
                        <div className="flex items-center justify-between mt-10">
                            <p className="font-bold text-xl">Colaboradores</p>
                            {admin && (
                                <Link
                                    className="flex max-w-[180px] items-center gap-2 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 transition-colors mt-7"
                                    to={`/proyectos/nuevo-colaborador/${project._id}`}
                                >
                                Añadir
                                </Link>
                            )}
                        </div>
                        <div className="bg-white shadow mt-10 overflow-y-auto max-h-[447px]">
                            {(project.colaboradores?.length > 0)
                                ? (
                                    project.colaboradores?.map((colaborador) => (
                                        <Collaborators
                                            key={colaborador._id}
                                            colaborador={colaborador}
                                        />
                                    ))
                                )
                                : (
                                    <p className="text-center my-5 p-10">
                                Aun no hay colaboradores asignados al proyecto
                                    </p>
                                )}
                        </div>
                        <ModalFormTask handleModal={handleModal} modal={modal}/>
                    </>
                )}
        </>
    )

}
