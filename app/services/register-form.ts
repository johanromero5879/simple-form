import { NewForm } from "@/models/form"
import { errorHandler } from "@/services/error-fetch-handler"

export const registerForm = async (form: NewForm) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/forms`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        
        const status = response.status
        const data = await response.json()

        if (status === 422) {
            const errors = data.errors.map((error: any) => error.msg)
            throw errors
        }
    } catch (error) {
        throw errorHandler(error)
    }
    
}