export const errorHandler = (error: unknown) => {
    if (error instanceof TypeError) {
        return Error("Error de conexión")
    }

    return error
}