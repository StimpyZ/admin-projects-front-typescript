import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useParams } from 'react-router-dom'

export default function NewPassword () {

    const { form, handleChangePassword, proofToken, validToken, isPasswordChanged, handleChange } = useContext(AuthContext)
    const { token = '' } = useParams()

    useEffect(() => {

        return () => {

            proofToken(token)

        }

    }, [])

    return (
        <>
            <h1 className="text-center text-sky-600 font-bold text-6xl">
                Reestablece tu contraseña y no pierdas acceso a tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {validToken && (
                <form
                    onSubmit={(e) => handleChangePassword(e, token)}
                    className="my-10 px-10 py-5 bg-white shadow rounded-lg"
                >
                    <div className="my-5">
                        <label
                            htmlFor="password"
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nueva contraseña
                        </label>
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                            placeholder="********"
                            id="password"
                            value={form.password}
                        />
                    </div>

                    <input
                        type="submit"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-sky-600 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors duration-300 mb-5"
                        value="Reestablecer contraseña"
                    />
                </form>
            )}

            {isPasswordChanged && (
                <Link to="/" className="block text-center text-sky-800">
                    Inicia sesion
                </Link>
            )}
        </>
    )

}
