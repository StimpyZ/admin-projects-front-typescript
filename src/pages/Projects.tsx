import { useContext, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { ProjectContext } from '../context/ProjectContext'
import PreviewProyecto from '../components/PreviewProject'

export default function Projects () {

    const { handelGetProjects, projects, loading } = useContext(ProjectContext)

    useEffect(() => {

        handelGetProjects()

    }, [])
    return (
        <>
            <h1 className="text-4xl font-bold p-4">Mis Proyectos</h1>
            {loading
                ? (
                    <Spinner />
                )
                : (
                    <div className="bg-white shadow mt-10">
                        {projects.length > 0
                            ? (
                                projects.map((projects) => (
                                    <PreviewProyecto
                                        key={projects._id}
                                        projects={projects}
                                    />
                                ))
                            )
                            : (
                                <p className="text-gray-600 uppercase text-center font-bold">
                            No hay proyectos
                                </p>
                            )}
                    </div>
                )}
        </>
    )

}
