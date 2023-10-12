import { createContext } from 'react'
import useAuthReducer from '../hooks/useAuthReducer'
import { type ContextProviderProps, type AuthContextProps } from '../types'

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: ContextProviderProps) => {

    const {
        alert,
        auth,
        confirmedAccount,
        form,
        isPasswordChanged,
        validToken,
        proofToken,
        handleSubmitLogin,
        handleChange,
        confirmAccount,
        handleSubmitRegister,
        handleSendEmail,
        handleChangePassword,
        handleLogout
    } = useAuthReducer()

    return (
        <AuthContext.Provider
            value={{
                form,
                alert,
                auth,
                confirmedAccount,
                isPasswordChanged,
                validToken,
                handleSubmitRegister,
                handleSubmitLogin,
                handleChange,
                confirmAccount,
                handleSendEmail,
                handleChangePassword,
                proofToken,
                handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}
