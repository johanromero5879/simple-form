interface ConfirmationPanelProps {
    message: string
    confirm?: () => void
}

export default function ConfirmationPanel({ message, confirm }: ConfirmationPanelProps) {
    return (
        <div className="text-gray-100 flex flex-col justify-center items-center gap-4">
            <div className="rounded-full h-28 w-28 text-4xl flex justify-center items-center bg-emerald-400 ">
                &#10003;
            </div>
            <p className="text-xl text-center">{ message }</p>
            <button
                className="bg-zinc-300 text-gray-700 font-semibold py-2 w-24"
                onClick={confirm}
            >
                Volver
            </button>
        </div>
    )
}