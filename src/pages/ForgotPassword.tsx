import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function ForgotPassword () {

    const { form, handleChange, handleSendEmail } = useContext(AuthContext)

    return (
        <>
            <h1 className="text-center text-sky-600 font-bold text-6xl">
                Recupera tu acceso para administrar tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            <form
                onSubmit={handleSendEmail}
                className="my-10 px-10 py-5 bg-white shadow rounded-lg">
                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input
                        onChange={handleChange}
                        name='email'
                        type="email"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="example@hotmail.com"
                        id="email"
                        value={form.email}
                    />
                </div>

                <input
                    type="submit"
                    className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-sky-600 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors duration-300 mb-5"
                    value="Enviar correo de recuperacion"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/registrar"
                    className="block text-center text-sky-800"
                >
                    ¿No tienes una cuenta? !Registrate¡
                </Link>

                <Link
                    to="/"
                    className="block text-center text-sky-800"
                >
                    ¿Ya tienes una cuenta? !Inicia sesion¡
                </Link>
            </nav>
        </>
    )

}
