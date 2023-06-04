interface AlertProps {
    message: string | string[]
    show: boolean
    type?: string
}

export default function Alert({ message, show, type = "info" }: AlertProps) {
    const theme: any = {
        warning: "text-yellow-200 border-yellow-200",
        error: "text-red-400 border-red-400",
        info: "text-blue-400 border-blue-400",
        success: "text-green-400 border-green-400"
    }

    return <>
        {show &&
            <div className={`rounded-md p-2 border-2 border-solid ${theme[type]}`}>
                {
                    !Array.isArray(message)
                        ? message
                        : <ul>
                            { message.map((msg, key) => (
                                <li 
                                    key={key}
                                >
                                    - { msg }
                                </li>
                            )) }
                        </ul>
                }
            </div>
        }
    </>
}   