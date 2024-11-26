import React, { useState, useRef } from 'react';
import Tooltip from './Tooltip';
import { Pencil } from 'lucide-react';

interface NumberEditableWrapperProps {
  value: number;
  setValue: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
  tailwind?: string;
}

const NumberEditableWrapper: React.FC<NumberEditableWrapperProps> = ({
  value,
  setValue,
  min,
  max,
  step = 1,
  tailwind = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newValue = value + step;
      if (max === undefined || newValue <= max) {
        setValue(newValue);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newValue = value - step;
      if (min === undefined || newValue >= min) {
        setValue(newValue);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      if (
        (min === undefined || newValue >= min) &&
        (max === undefined || newValue <= max)
      ) {
        setValue(newValue);
      }
    }
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    // Focus the input after a brief delay to ensure it's rendered. Not really sure why I needed to do this but its necessary.
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  return (
    <div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          min={min}
          max={max}
          step={step}
          className={`${tailwind} px-2 py-1 border border-blue-500 rounded outline-none`}
        />
      ) : (
        <Tooltip
            text={(<Pencil color={'gray'} size={16}/>)}
            coords={[-5,20]}
            tailwind='text-gray-100'
        >
            <div
            onClick={handleStartEditing}
            className={`${tailwind} cursor-pointer px-2 py-1 hover:bg-gray-100 rounded`}
            >
            {value}
            </div>
        </Tooltip>
      )}
    </div>
  );
};

export default NumberEditableWrapper;