import { useContext } from 'react'
import useAdmin from '../hooks/useAdmin'
import { type Colaboradore } from '../types'
import { ProjectContext } from '../context/ProjectContext'
import { ConfirmAlert } from '../config/alerts'

interface CollaboratorsProps {
    colaborador: Colaboradore
}
export default function Collaborators ({ colaborador }: CollaboratorsProps) {

    const { nombre, email, _id } = colaborador
    const { handleDeleteCollaborator } = useContext(ProjectContext)
    const admin = useAdmin()
    return (
        <div className="border-b p-5 md:flex justify-between items-center">
            <div>
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{email}</p>
            </div>
            <div>
                {admin && (
                    <button
                        onClick={() => ConfirmAlert({
                            title: 'Eliminar Colaborador',
                            text: '¿Estas seguro de eliminar el colaborador?',
                            handleConfirm: () => handleDeleteCollaborator(_id)
                        })}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    )

}
