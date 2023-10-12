import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import Spinner from './Spinner'
import { useParams } from 'react-router-dom'
const PRIORIDAD = ['ALTA', 'MEDIA', 'BAJA']

interface ModalFormTaskProps {
    modal: boolean
    handleModal: () => void
}
export default function ModalFormTask ({ modal, handleModal }: ModalFormTaskProps) {

    const { loading, handleChangeTask, taskForm, handleSubmitCreateTask, task, handleFillTaskForm, handleEditTask } = useContext(ProjectContext)
    const { id = '' } = useParams()

    useEffect(() => {

        if (task._id.length > 0) {

            handleFillTaskForm(task)

        }

    }, [task._id])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (task._id.length > 0) {

            handleEditTask(task._id, taskForm)

        } else {

            handleSubmitCreateTask({ ...taskForm, proyecto: id })

        }

    }

    return (
        <Transition.Root show={modal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 rounded-lg sm:align-middle sm:max-w-lg sm:w-full sm:p-6">

                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    onClick={handleModal}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-3xl leading-6 font-bold text-gray-900">
                                        {/* {id ? 'Editar tarea' : 'Crear tarea'} */}
                                    </Dialog.Title>
                                    <form
                                        onSubmit={handleSubmit}
                                        className='my-6'>
                                        <div className='mb-5'>
                                            <label
                                                htmlFor='nombre'
                                                className='text-gray-600 font-bold text-sm uppercase'>
                                                Nombre de la tarea
                                            </label>
                                            <input
                                                name='nombre'
                                                onChange={handleChangeTask}
                                                value={taskForm.nombre}
                                                type='text'
                                                id='nombre'
                                                className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                htmlFor='descripcion'
                                                className='text-gray-600 font-bold text-sm uppercase'>
                                                Descripción de la tarea
                                            </label>
                                            <textarea
                                                name='descripcion'
                                                onChange={handleChangeTask}
                                                value={taskForm.descripcion}
                                                id='descripcion'
                                                className='h-20 border mt-1 rounded px-4 py-1 w-full bg-gray-50'
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                htmlFor='fecha'
                                                className='text-gray-600 font-bold text-sm uppercase'>
                                                Fecha de entrega de la tarea
                                            </label>
                                            <input
                                                name='fechaEntrega'
                                                onChange={handleChangeTask}
                                                value={taskForm.fechaEntrega}
                                                type='date'
                                                id='fecha'
                                                className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                htmlFor='prioridad'
                                                className='text-gray-600 font-bold text-sm uppercase'>
                                                Prioridad de la tarea
                                            </label>
                                            <select
                                                name='prioridad'
                                                onChange={handleChangeTask}
                                                value={taskForm.prioridad}
                                                id='prioridad'
                                                className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                            >
                                                <option value=''>-- Seleccione --</option>
                                                {PRIORIDAD.map((prioridades, index) => (
                                                    <option key={index} value={prioridades}>{prioridades}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <input type='submit' className='bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2 cursor-pointer text-white font-bold uppercase w-full' value={'Guardar'} />

                                    </form>
                                    {loading && <Spinner />}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )

}
