import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from 'react-redux';

export default function List({todo ,onEdit,onDelete, onComplete, isComplete = false}){
    return (
        <div className="border border-gray-500 flex items-center justify-between w-full p-3">
            <div className='flex items-center gap-2 flex-1'>
                <input type="checkbox" onChange={onComplete} />
                <span className={`${isComplete && 'line-through'} relative flex-1 capitalize font-semibold`}>
                    {todo}
                </span>
            </div>
            <div className='flex gap-2'>
                <BiEditAlt onClick={onEdit} size={24} className='cursor-pointer' />
                <MdDeleteForever onClick={onDelete} size={24}  className='cursor-pointer' />
            </div>
        </div>
    )
}