interface AlertProps {
    message: string | string[]
    show: boolean
    type?: string
}

export default function Alert({ message, show, type = "info" }: AlertProps) {
    let classes = ""
    const theme = {
        warning: "yellow-300",
        error: "red-400",
        info: "blue-400",
        success: "green-400"
    }

    if (type === "warning") {
        classes += `text-${theme.warning} border-${theme.warning}`
    } else if (type === "error") {
        classes += `text-${theme.error} border-${theme.error}`
    } else if (type === "info") {
        classes += `text-${theme.info} border-${theme.info}`
    } else if (type === "success") {
        classes += `text-${theme.success} border-${theme.success}`
    }

    return <>
        {show &&
            <div className={`${classes} rounded-md p-2 border-2 border-solid`}>
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