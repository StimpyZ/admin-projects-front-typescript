import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ConfirmAccount from './pages/ConfirmAccount'
import { AuthProvider } from './context/AuthContext'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ProtectedRoute from './layouts/ProtectedRoute'
import Projects from './pages/Projects'
import { ProjectProvider } from './context/ProjectContext'
import Project from './pages/Project'
import NewProject from './pages/NewProject'
import EditProject from './pages/EditProject'
import AddNewCollaborator from './pages/AddNewCollaborator'

function App (): JSX.Element {

    return (
        <BrowserRouter>
            <AuthProvider>
                <ProjectProvider>
                    <Routes>
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<Login />}/>
                            <Route path='register' element={<Register />}/>
                            <Route path='confirmar/:id' element={<ConfirmAccount />}/>
                            <Route path="olvide-password"element={<ForgotPassword />}/>
                            <Route path="olvide-password/:token" element={<NewPassword />}/>
                        </Route>

                        <Route path="/proyectos" element={<ProtectedRoute />}>
                            <Route index element={<Projects />} />
                            <Route path=":id" element={<Project />}/>
                            <Route path="crear-proyecto" element={<NewProject />}/>
                            <Route path="editar/:id" element={<EditProject />}/>
                            <Route path="nuevo-colaborador/:id"element={<AddNewCollaborator />} />
                        </Route>
                    </Routes>
                </ProjectProvider>
            </AuthProvider>
        </BrowserRouter>
    )

}

export default App
