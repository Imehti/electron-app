import React from 'react'
import { Field } from 'formik'

interface InputFieldProps {
  name: string
  type: string
  label?: string
  min?: string
  formik: {
    errors: any
    touched: any
    values: any
    setFieldValue: (field: string, value: any) => void // Add setFieldValue to formik props
  }
  as?: string // Allow the use of custom element types (e.g., 'select')
  className?: string
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  label,
  formik,
  as = 'input', // Default to 'input', but can be overridden for select
  className,
  min
}) => {
  const { errors, touched, values, setFieldValue } = formik

  // Determine border color
  const hasError = errors[name] && touched[name]
  const isValid = !errors[name] && touched[name] && values[name] !== ''

  const borderColor = hasError
    ? 'border-red-500'
    : isValid
      ? 'border-green-600'
      : 'border-[#3B3B3B]'

  // Handle change for 'select' type inputs
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { value } = e.target
    setFieldValue(name, value)
  }

  return (
    <div className={`flex flex-col items-start space-y-2 ${className}`}>
      <label htmlFor={name}>{label}</label>

      {/* If `as` is 'select', render a <select> element */}
      {as === 'select' ? (
        <Field
          as="select"
          name={name}
          className={`px-2 rounded-md h-[48px] border border-1 ${borderColor} w-full focus:outline-none`}
          onChange={handleChange}
        >
          <option value="">انتخاب کنید</option>
          <option value="xs111">xs111</option>
          <option value="xs222">xs222</option>
          {/* Add other options as needed */}
        </Field>
      ) : (
        <Field
          name={name}
          type={type}
          min={min}
          className={`px-2 rounded-md h-[48px] border border-1 ${borderColor} w-full focus:outline-none`}
        />
      )}

      {/* Show error message */}
      <div className="text-red-500 mt-1 text-sm h-[16px]">
        {hasError && <span>{errors[name]}</span>}
      </div>
    </div>
  )
}

export default InputField
