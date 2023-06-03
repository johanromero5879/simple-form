import { 
  ChangeEventHandler
} from "react"

interface TextFieldProps {
    name: string
    value: any
    label?: string
    placeholder?: string
    required?: boolean
    error?: string
    onChange: ChangeEventHandler
}

const TextField = (
  { 
    name, 
    value,
    error,
    label,
    placeholder,
    onChange,
    required = false
  }: TextFieldProps
) => {
    return (
      <div className="w-full text-gray-200">
        <label 
          className="block text-sm "
          htmlFor={name}
        >
          { label }

          { !!required && <span className="text-red-500"> *</span>}
            
        </label>
        <div className="mt-2">
          <input 
            className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-600 focus:outline-none"
            type="text"
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          >
          </input>
        </div>
        <small className="text-red-500">{ error }</small>
      </div>
    )
}

export default TextField