import type { ChangeEvent } from 'react'

interface InputProps {
  label: string
  name: string
  type: string
  autoComplete?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}

export function Input(props: InputProps) {
  return (
    <>
      <label
        htmlFor={props.name}
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2.5">
        <input
          id={props.name}
          name={props.name}
          type={props.type}
          autoComplete={props.autoComplete}
          required={props.required}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </>
  )
}
