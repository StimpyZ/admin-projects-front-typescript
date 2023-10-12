import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Login () {

    const { form, handleChange, handleSubmitLogin } = useContext(AuthContext)
    const { email, password } = form

    return (
        <>
            <h1 className="text-center text-sky-600 font-bold text-6xl">
            Inicia sesion y administra tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>
            <form
                onSubmit={handleSubmitLogin}
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
                        type="email"
                        name='email'
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="example@hotmail.com"
                        id="email"
                        value={email}
                    />
                </div>

                <div className="my-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                    Contraseña
                    </label>
                    <input
                        onChange={handleChange}
                        name='password'
                        type="password"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="example@hotmail.com"
                        id="password"
                        value={password}
                    />
                </div>

                <input
                    type="submit"
                    className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-sky-600 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors duration-300 mb-5"
                    value="Iniciar sesion"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/register"
                    className="block text-center text-sky-800"
                >
                ¿No tienes una cuenta? !Registrate¡
                </Link>

                <Link
                    to="/olvide-password"
                    className="block text-center text-sky-800"
                >
                Olvide mi contraseña
                </Link>
            </nav>
        </>
    )

}
