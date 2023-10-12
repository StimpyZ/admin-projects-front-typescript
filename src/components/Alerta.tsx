import { type AlertState } from '../types'

export default function Alerta ({ error, msg }: AlertState) {

    return (
        <div
            className={`${
                error
                    ? 'bg-red-300 border-l-4 border-red-500'
                    : 'bg-sky-300 border-l-4 border-sky-500'
            } text-center p-4 uppercase text-white font-bold text-sm my-10`}
        >
            {msg}
        </div>
    )

}
