export default function formatDate (date: string): string {

    const newDate = new Date(date)

    const options = {
        weekday: 'long' as const,
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const
    }

    return newDate.toLocaleDateString('es-ES', options)

}
