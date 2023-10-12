import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import { AuthContext } from '../context/AuthContext'

export default function useAdmin () {

    const { project } = useContext(ProjectContext)
    const { auth } = useContext(AuthContext)

    return auth?._id === project?.creador

}
