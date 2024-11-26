import React, { useState } from "react";

interface TooltipProps {
    text: string;

    children: React.ReactNode

    coords: [number, number]   
}

const Tooltip = ({ text, children, coords } : TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex overflow-visible items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-[9999] flex px-4 py-1 text-xs font-thin text-white bg-gray-700 rounded-lg"
        style={{
            top: coords[0] ?? "auto",
            left: coords[1] ?? "auto",
            whiteSpace: "nowrap",
            pointerEvents: 'none'
          }}>
            <span className="!whitespace-nowrap">{text}</span>
          
        </div>
      )}
    </div>
  );
};

export default Tooltip;