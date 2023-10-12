export const getAuthHeaders = () => {

    const token = localStorage.getItem('token')
    if (token == null) return

    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

}
