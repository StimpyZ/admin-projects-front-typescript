import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import Alerta from '../components/Alerta'

export default function ConfirmAccount () {

    const { id = '' } = useParams()
    const { confirmAccount, confirmedAccount, alert } = useContext(AuthContext)

    useEffect(() => {

        return () => {

            confirmAccount(id)

        }

    }, [])

    return (
        <>
            <h1 className="text-center text-sky-600 font-bold text-6xl">
                Confirma tu cuenta y comienza a crear tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            <div className="mt-5 md:mt-20 shadow-lg px-5 py-10 rounded-lg bg-white">
                {alert.msg.length > 0 && (
                    <Alerta error={alert.error} msg={alert.msg} />
                )}
                {(confirmedAccount ?? false)
                    ? (
                        <Link to="/" className="block text-center text-sky-800">
                        Inicia sesion
                        </Link>
                    )
                    : (
                        <Link to="/" className="block text-center text-sky-800">
                        Ir al inicio
                        </Link>
                    )}
            </div>
        </>
    )

}
