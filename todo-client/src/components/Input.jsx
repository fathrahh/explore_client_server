import { useRef } from "react"

export default function Input ({onChange, value, placeholder, className, ...other}) {
    return <input className={`px-3 py-2 border-gray-500 text-gray-500 outline-none w-80 border-2 rounded ${className}`} placeholder={placeholder ?? `What to do...`} onChange={onChange} value={value} {...other}/>
}