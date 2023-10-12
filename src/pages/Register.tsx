import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Register () {

    const { handleSubmitRegister, handleChange, form } = useContext(AuthContext)
    const { nombre, email, password, password2 } = form

    return (
        <>
            <h1 className="text-center text-sky-600 font-bold text-6xl">
        Crea una cuenta y administra tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>
            <form
                onSubmit={handleSubmitRegister}
                className="my-10 px-10 py-5 bg-white shadow rounded-lg">

                <div className="my-5">
                    <label
                        htmlFor="nombre"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                Nombre
                    </label>
                    <input
                        onChange={handleChange}
                        value={nombre}
                        name="nombre"
                        type="text"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="Juan, Pedro, Maria..."
                        id="nombre"
                    />
                </div>

                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                Email
                    </label>
                    <input
                        onChange={handleChange}
                        autoComplete='on'
                        value={email}
                        name="email"
                        type="email"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="example@hotmail.com"
                        id="email"
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
                        value={password}
                        onChange={handleChange}
                        name="password"
                        type="password"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="********"
                        id="password"
                    />
                </div>

                <div className="my-5">
                    <label
                        htmlFor="password2"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                Repite la contraseña
                    </label>
                    <input
                        value={password2}
                        onChange={handleChange}
                        name="password2"
                        type="password"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="********"
                        id="password2"
                    />
                </div>

                <input
                    type="submit"
                    className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-sky-600 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors duration-300 mb-5"
                    value="Crear cuenta"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/"
                    className="block text-center text-sky-800"
                >
            ¿Ya tienes una cuenta? !Inicia sesion¡
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
