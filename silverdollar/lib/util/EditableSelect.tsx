import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import Tooltip from './Tooltip'

interface Props<T> {
    value: T
    setValue: (newValue: T) => void
    selectables: T[]
    tailwind?: string
    label?: string
}

const EditableSelectWrapper = <T,>({
    value,
    setValue,
    selectables,
    tailwind,
    label = ''
}: Props<T>) => {
    const [isEditable, setIsEditable] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newVal = e.target.value;
        setValue(newVal as T);
    }

    const handleStartEditing = () => {
        console.log("Clicking");
        setIsEditable(true);
    };

    return (
        <div>
            {isEditable ? (
                <select
                    required
                    value={value as string}
                    onChange={handleChange}
                    className={`${tailwind} mt-1 rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    onBlur={() => setIsEditable(false)}
                >
                    {selectables.map((option, index) => (
                        <option key={index} value={option as string}>
                            {option as string}
                        </option>
                    ))}
                </select>
            ) : (
                <Tooltip
                    text={!isEditable ? (<Pencil color={'gray'} size={12}/>) : ("")}
                    coords={[-6,10]}
                    tailwind='text-gray-100'
                >
                    <div 
                        className={`${tailwind} cursor-pointer`} 
                        onClick={handleStartEditing} 
                    >
                        <b>{label}</b> {value as string}
                    </div>
                </Tooltip>
            )}
        </div>
    )
}

export default EditableSelectWrapper;