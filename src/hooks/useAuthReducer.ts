import { useEffect, useReducer } from 'react'
import {
    ACTION_AUTH_TYPES,
    authReducer,
    initialState
} from '../reducers/authReducer'
import { ErrorAlert, SuccessAlert } from '../config/alerts'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom'

export default function useAuthReducer () {

    const [
        { form, auth, alert, confirmedAccount, isPasswordChanged, validToken },
        dispatch
    ] = useReducer(authReducer, initialState)
    const navigate = useNavigate()

    useEffect(() => {

        const authUser = async () => {

            const token = localStorage.getItem('token')
            if (token == null) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            dispatch({ type: ACTION_AUTH_TYPES.LOADING })
            try {

                const { data } = await axiosClient.get(
                    '/usuarios/perfil',
                    config
                )
                dispatch({
                    type: ACTION_AUTH_TYPES.LOGIN,
                    payload: {
                        auth: data
                    }
                })
                navigate('/proyectos')

            } catch (error: any) {

                console.log(error)

            }

        }

        return () => {

            void authUser()

        }

    }, [])

    const handleLogout = () => {

        localStorage.removeItem('token')
        dispatch({ type: ACTION_AUTH_TYPES.LOGOUT })

    }

    const proofToken = async (token: string) => {

        dispatch({ type: ACTION_AUTH_TYPES.LOADING })
        try {

            await axiosClient.get(`/usuarios/olvide-password/${token}`)
            dispatch({ type: ACTION_AUTH_TYPES.VALID_TOKEN })

        } catch (error: any) {

            console.log(error)

        }

    }

    const confirmAccount = async (id: string) => {

        dispatch({ type: ACTION_AUTH_TYPES.LOADING })
        try {

            const { data } = await axiosClient.get(`/usuarios/confirmar/${id}`)

            dispatch({
                type: ACTION_AUTH_TYPES.CONFIRM_ACCOUNT,
                payload: {
                    alert: { msg: data.msg, error: false }
                }
            })

        } catch (error: any) {

            dispatch({
                type: ACTION_AUTH_TYPES.CONFIRM_ACCOUNT_ERROR,
                payload: {
                    alert: { msg: error.response.data.msg, error: true }
                }
            })

        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        dispatch({
            type: ACTION_AUTH_TYPES.HANDLE_CHANGE,
            payload: {
                [e.target.name]: e.target.value
            }
        })

    }

    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if ([form.email, form.password].includes('')) {

            ErrorAlert({ error: 'All fields are required' })
            return

        }
        dispatch({ type: ACTION_AUTH_TYPES.LOADING })
        try {

            const { data } = await axiosClient.post('/usuarios/login', {
                email: form.email,
                password: form.password
            })
            localStorage.setItem('token', data.token)
            dispatch({
                type: ACTION_AUTH_TYPES.LOGIN,
                payload: { auth: data }
            })
            navigate('/proyectos')

        } catch (error: any) {

            ErrorAlert({
                error: error.response.data.msg
            })
            console.log(error)

        }

        dispatch({
            type: ACTION_AUTH_TYPES.CLEAN_FORM_STATE
        })

    }

    const handleSubmitRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault()
        if (
            [form.email, form.password, form.nombre, form.password2].includes(
                ''
            )
        ) {

            ErrorAlert({ error: 'All fields are required' })
            return

        }

        if (form.password !== form.password2) {

            ErrorAlert({ error: 'Passwords do not match' })

        }

        try {

            const { data } = await axiosClient.post('/usuarios', {
                nombre: form.nombre,
                email: form.email,
                password: form.password
            })

            SuccessAlert({
                title: 'Success',
                text: data.msg
            })

        } catch (error: any) {

            ErrorAlert({
                error: error.response.data.msg
            })
            console.log(error)

        }
        dispatch({
            type: ACTION_AUTH_TYPES.CLEAN_FORM_STATE
        })

    }

    const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if (form.email === '') {

            ErrorAlert({ error: 'All fields are required' })
            return

        }

        try {

            const { data } = await axiosClient.post(
                '/usuarios/olvide-password',
                { email: form.email }
            )

            SuccessAlert({
                title: 'Success',
                text: data.msg
            })

        } catch (error: any) {

            ErrorAlert({ error: error.response.data.msg })

        }

    }

    const handleChangePassword = async (
        e: React.FormEvent<HTMLFormElement>,
        token: string
    ) => {

        e.preventDefault()
        if (form.password === '' || form.password.length < 6) {

            ErrorAlert({ error: 'Password must be at least 6 characters' })
            return

        }
        dispatch({ type: ACTION_AUTH_TYPES.LOADING })
        try {

            const { data } = await axiosClient.post(
                `/usuarios/olvide-password/${token}`,
                { password: form.password }
            )
            dispatch({ type: ACTION_AUTH_TYPES.PASSWORD_CHANGED })
            SuccessAlert({ text: data.msg, title: 'Success' })
            navigate('/')

        } catch (error: any) {

            console.log(error)

        }
        dispatch({ type: ACTION_AUTH_TYPES.CLEAN_FORM_STATE })

    }

    return {
        form,
        auth,
        alert,
        confirmedAccount,
        isPasswordChanged,
        validToken,
        handleChange,
        handleSubmitLogin,
        handleSubmitRegister,
        confirmAccount,
        handleSendEmail,
        handleChangePassword,
        proofToken,
        handleLogout
    }

}
