import {
    ChangeEvent,
    FormEvent,
    useState
} from "react"

type Status = "IDLE" | "SUCCESS" | "ERROR" | "LOADING" 

type FieldErrors<State> = Record<keyof State, string>
type Rules<State> = Record<keyof State, Array<(value: any) => string | boolean>>

interface FormProps<State> {
    initialState: State,
    rules: Rules<State>,
    onSubmit: () => Promise<void>
}

export const useForm = <State>({ initialState, rules, onSubmit }: FormProps<State>) => {
    const [state, setState] = useState<State>({...initialState})
    const [status, setStatus] = useState<Status>("IDLE")
    const [errors, setErrors] = useState<FieldErrors<State>>({} as FieldErrors<State>)

    const submit = async () => {
        setStatus("LOADING")
        setTimeout(async () => {
            try {
                await onSubmit()
                clearForm()
            } catch (error) {
                setStatus("ERROR")
            }
        }, 3000)
    }

    const clearForm = () => {
        setState({...initialState})
        setStatus("IDLE")
    }

    const validate = () => {
        let errors = {} as FieldErrors<State>
        let isValid = false

        for (const field in rules) {
            const value = state[field]
            const errorMessage = validateField(field, value)
            
            if (!!errorMessage && !errors[field]) {
                errors[field] = errorMessage
            }
        }
        
        isValid = Object.keys(errors).length === 0
        setErrors(errors)

        return isValid
    }

    const validateField = (field: keyof State, value: any) => {

        for (const rule of rules[field]) {
            const errorMessage = rule(value)

            if (typeof errorMessage === "string" ) {
                setStatus("ERROR")
                return errorMessage
            }
        }

        return null
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (validate()) {
            submit()
        }
    }

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target
        setState(state => {
            const field = name as keyof State
            const errorMessage = validateField(field, value)

            setErrors((errors) => {
                if (!errorMessage) {
                    delete errors[field]
                    return errors
                }
                return {...errors, [field]: errorMessage}
            })

            return {...state, [field]: value}
        })
    }

    return {
        state,
        status,
        errors,
        handleChange,
        handleSubmit
    }
}