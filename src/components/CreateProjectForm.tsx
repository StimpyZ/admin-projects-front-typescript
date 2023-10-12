import { useContext, useEffect } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import { useParams } from 'react-router-dom'

export default function CreateProjectForm () {

    const { handleChange, handleCreateProject, handleFillFormProject, formProject, project, handleEditProject } = useContext(ProjectContext)
    const { id = '' } = useParams()

    useEffect(() => {

        if (id.length > 0) {

            handleFillFormProject(project)

        }

    }, [id, project])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if (id.length > 0) {

            handleEditProject(id, formProject)

        } else {

            handleCreateProject(formProject)

        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white px-5 py-10 md:w-1/2 shadow">
            <div className="mb-5">
                <label
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Nombre del proyecto
                </label>

                <input
                    onChange={handleChange}
                    name='nombre'
                    id="nombre"
                    type="text"
                    className="w-full bg-gray-100 p-2 border border-gray-200 outline-none focus:border-gray-800 mt-2"
                    placeholder="Cambiar los colores..."
                    value={formProject.nombre}
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="descripcion"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Descripcion del proyecto
                </label>

                <textarea
                    onChange={handleChange}
                    name='descripcion'
                    id="descripcion"
                    className="w-full bg-gray-100 p-2 border border-gray-200 outline-none focus:border-gray-800 mt-2"
                    placeholder="Cambiar los colores..."
                    value={formProject.descripcion}
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="fechaEntrega"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Fecha de entrega del proyecto
                </label>

                <input
                    onChange={handleChange}
                    name='fechaEntrega'
                    id="fechaEntrega"
                    type="date"
                    className="w-full bg-gray-100 p-2 border border-gray-200 outline-none focus:border-gray-800 mt-2"
                    value={formProject.fechaEntrega}
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="cliente"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Cliente
                </label>

                <input
                    onChange={handleChange}
                    name='cliente'
                    id="cliente"
                    type="text"
                    className="w-full bg-gray-100 p-2 border border-gray-200 outline-none focus:border-gray-800 mt-2"
                    placeholder="Cambiar los colores..."
                    value={formProject.cliente}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer transition-colors"
                value={(id.length > 0) ? 'Actualizar proyecto' : 'Crear proyecto'}
            />
        </form>
    )

}
