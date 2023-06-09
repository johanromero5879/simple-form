import { 
    ChangeEventHandler
} from "react"

interface Item {
    label: string,
    value?: string,
    emoji?: string
}

interface SelectProps {
    name: string
    value: any
    items: Item[]
    label?: string
    placeholder?: string
    required?: boolean
    error?: string
    onChange: ChangeEventHandler
}

const Select = (
    { 
        name, 
        value,
        items,
        error,
        label,
        placeholder,
        onChange,
        required = false
    }: SelectProps
) => {
    return (
    <div className="w-full text-gray-200">
        <label 
            className="block text-sm"
            htmlFor={name}
        >
        { label }

        { !!required && <span className="text-red-500"> *</span>}
            
        </label>
        <div className="mt-2">
            <select
                className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-600 focus:outline-none"
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            >
                <option 
                    className="text-gray-500"
                    value=""
                >
                    --Seleccione--
                </option>
                { items.map((item, key) => (
                    <option 
                        key={key}
                        value={item.value || item.label}
                    >
                        { item.label } { item.emoji }&emsp;
                    </option>
                )) }
                
            </select>
        </div>
        <small className="text-red-500">{ error }</small>
    </div>
    )
}

export default Select