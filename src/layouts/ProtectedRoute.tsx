import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export default function ProtectedRoute () {

    const { auth } = useContext(AuthContext)

    if (auth._id.length === 0) return <Navigate to="/" />

    return (
        <>
            <div className='bg-gray-100'>
                <Header />

                <div className='md:flex md:min-h-screen'>

                    <Sidebar />

                    <main className='flex-1 p-10 overflow-y-hidden'>
                        <Outlet />
                    </main>
                </div>
            </div>

        </>
    )

}
