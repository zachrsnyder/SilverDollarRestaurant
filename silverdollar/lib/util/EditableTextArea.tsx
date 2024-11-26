import React, { useState, useRef, useEffect } from 'react';
import Tooltip from './Tooltip';
import { Pencil } from 'lucide-react';

interface Props {
    value: string;
    setValue: (newValue: string) => void;
    tailwind?: string;
    rows?: number;
    label?: string;
}

const EditableTextAreaWrapper: React.FC<Props> = ({
    value,
    setValue,
    tailwind = '',
    rows = 3,
    label
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-focus and select text when entering edit mode
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, [isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleStartEditing = () => {
        setIsEditing(true);
    };

    return (
        <div className={`${tailwind}`}>
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleChange}
                    onBlur={() => setIsEditing(false)}
                    rows={rows}
                    className="w-full p-2 rounded-md focus:outline-none"
                    placeholder=''
                />
            ) : (
                <Tooltip
                    text={(<Pencil color={'gray'} size={16}/>)}
                    coords={[-10,10]}
                    tailwind='text-gray-100'
                >
                    <div 
                        onClick={handleStartEditing}
                        className="cursor-pointer p-2 rounded-md hover:bg-gray-50"
                    >
                        {label && <div className="font-bold mb-1">{label}</div>}
                        {value || <span className="text-gray-400">''</span>}
                    </div>
                </Tooltip>
            )}
        </div>
    );
};

export default EditableTextAreaWrapper;