import Swal from 'sweetalert2'

export const ErrorAlert = ({ error }: { error: string }) => {

    void Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
    })

}

export const SuccessAlert = ({ title, text }: { title: string, text: string }) => {

    void Swal.fire({
        icon: 'success',
        title,
        text
    })

}

interface ConfirmAlertProps {
    title: string
    text: string
    handleConfirm: () => void
}

export const ConfirmAlert = ({ title, text, handleConfirm }: ConfirmAlertProps) => {

    void Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then((result) => {

        if (result.isConfirmed) {

            handleConfirm()

        }

    })

}
