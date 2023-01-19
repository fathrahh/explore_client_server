export default function Button({ className = '', onClick, children, ...other }){
    return (
        <button className={`rounded text-white font-semibold px-4 text-sm py-2 bg-purple-600 ${className}`} onClick={onClick} {...other}>{children}</button>
    )
}