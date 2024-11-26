import React, { useState, useRef, useEffect } from 'react';
import Tooltip from './Tooltip';
import { Pencil } from 'lucide-react';

interface EditableWrapperProps {
  value: string;
  setValue: (newValue: string) => void;
  tailwind?: string;

  coords?: [number, number]
}

const EditableWrapper: React.FC<EditableWrapperProps> = ({
  value,
  setValue,
  tailwind = '',
  coords
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  // Initialize ref content when value changes or editing state changes
  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.textContent = value;
    }
  }, [value, isEditing]);

  const handleStartEditing = () => {
    if (!isEditing && editableRef.current) {
      editableRef.current.textContent = value;
      setIsEditing(true);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.textContent || '';
    setValue(newText);
  };

  //set editable ref to this div, so its inner text can be accessed. This is essential to maintain that text's state between entering and exeting editing.
  return (
    <Tooltip
      text={!isEditing ? (<Pencil color={'gray'} size={12}/>) : ("")}
      coords={coords ? coords : [-6,-6] }
      tailwind='text-gray-100'
    >
      <div
        ref={editableRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={() => setIsEditing(false)}
        onClick={handleStartEditing}
        onInput={handleInput}
        className={`px-2 ${isEditing ? 'cursor-text border-2 border-gray-400' : 'cursor-pointer'
        } ${tailwind}`}
      >
        {isEditing ? null : value}
      </div>
    </Tooltip>
  );
};

export default EditableWrapper;