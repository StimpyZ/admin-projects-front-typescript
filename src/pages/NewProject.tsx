import CreateProjectForm from '../components/CreateProjectForm'

export default function NewProject () {

    return (
        <>
            <h1 className="text-4xl font-bold">Crea tus proyectos</h1>

            <div className="mt-10 flex justify-center">
                <CreateProjectForm />
            </div>
        </>
    )

}
