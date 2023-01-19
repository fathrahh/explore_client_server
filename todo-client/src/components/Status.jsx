import { useSelector } from "react-redux";
import Button from "./Button";

export default function Status({className,onClick, isActive, children, ...other}){
    return <Button className={`${isActive ? 'bg-green-600' : 'bg-gray-600'} transition-all duration-300 text-xs p-1 rounded-full ${className}`} onClick={onClick} {...other}>{children}</Button>
}