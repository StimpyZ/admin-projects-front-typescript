import { useContext } from 'react'
import Spinner from '../components/Spinner'
import { ProjectContext } from '../context/ProjectContext'
import FormCollaborator from '../components/FormCollaborator'

export default function AddNewCollaborator () {

    const { loading, project, colaboradores, handleAddCollaborator } = useContext(ProjectContext)

    return (
        <>
            <h1 className="text-4xl font-bold">Añadir colaborador al proyecto: <span className='text-gray-500 font-normal'>{project.nombre}</span></h1>

            <div className="mt-10 flex justify-center">
                <FormCollaborator />
            </div>

            {loading
                ? <Spinner />
                : (colaboradores._id.length > 0) && (
                    <div className='flex justify-center mt-10 '>
                        <div className='bg-white shadow py-10 px-5 md:w-1/2'>
                            <h2 className='text-center mb-7 text-2xl font-bold'>Resultados</h2>
                            <div className='flex justify-between items-center'>
                                <p className='text-gray-500 font-bold'>{colaboradores.nombre}</p>
                                <button
                                    onClick={() => handleAddCollaborator(colaboradores.email)}
                                    className='bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2 cursor-pointer text-white font-bold uppercase' >Agregar al proyecto</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )

}
// colaborador?._id &&
