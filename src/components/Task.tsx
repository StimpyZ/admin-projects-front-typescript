import { useContext } from 'react'
import formatDate from '../config/formatDate'
import useAdmin from '../hooks/useAdmin'
import { type Tarea } from '../types'
import { ProjectContext } from '../context/ProjectContext'
import { ConfirmAlert } from '../config/alerts'

interface TaskProps {
    task: Tarea
}
function AdminButtons ({ task }: TaskProps) {

    const { handleModalEditTask, handleDeleteTask } = useContext(ProjectContext)

    return (
        <>
            <button
                onClick={() => ConfirmAlert({
                    title: 'Eliminar Tarea',
                    text: '¿Estas seguro de eliminar esta tarea?',
                    handleConfirm: () => handleDeleteTask(task._id)
                })}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
            >
            Eliminar
            </button>

            <button
                onClick={() => handleModalEditTask(task)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-[93px]"
            >
            Editar
            </button>
        </>
    )

}

export default function Task ({ task }: TaskProps) {

    const { handleChangeStateTask } = useContext(ProjectContext)
    const { nombre, descripcion, fechaEntrega, prioridad, estado } = task
    const admin = useAdmin()
    return (
        <div className="border-b p-5 md:flex justify-between items-center">
            <div className='flex flex-col items-start'>
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">
                    {descripcion}
                </p>
                <p className="mb-1 text-sm capitalize">
                    {formatDate(fechaEntrega)}
                </p>
                <p className="mb-1 text-gray-500">{prioridad}</p>
                {estado && <p className='text-xs py-[3px] px-3 text-white bg-green-500 rounded-xl text-center font-bold mt-2 mb-4 md:mb-0'>Completada por: {task?.completado?.nombre}</p>}
            </div>
            <div className="flex flex-wrap gap-3">
                {admin && (
                    <AdminButtons task={task}/>
                )}
                <button
                    onClick={() => handleChangeStateTask(task._id)}
                    className={`${
                        estado
                            ? 'bg-green-500 hover:bg-green-700'
                            : 'bg-gray-500 hover:bg-gray-700'
                    } text-white font-bold py-2 px-4`}
                >
                    {estado ? 'Completa' : 'Incompleta'}
                </button>
            </div>
        </div>
    )

}
