import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { type Project } from '../types'

interface PreviewProyectoProps {
    projects: Project
}

export default function PreviewProyecto ({ projects }: PreviewProyectoProps) {

    const { auth } = useContext(AuthContext)
    const { nombre, _id, cliente, creador } = projects
    return (
        <div className="border-b p-5 flex">

            <div className='flex items-center gap-5'>
                <p className='flex-1 font-bold'>
                    {nombre}
                    <span className='text-gray-600 font-normal'> - {cliente}</span>
                </p>

                {auth._id !== creador && (
                    <p className='p-2 text-xs bg-green-500 font-bold uppercase rounded-lg text-white'>Colaborador</p>
                )}
            </div>

            <Link
                className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to={`${_id}`}>
                Ver proyecto
            </Link>
        </div>
    )

}
