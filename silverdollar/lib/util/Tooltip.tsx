import React, { useState } from "react";

interface TooltipProps {
    text: string | React.ReactNode;

    children: React.ReactNode

    coords: [number, number]
    
    tailwind?: string
}

const Tooltip = ({ text, children, coords, tailwind } : TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex overflow-visible items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute flex ${tailwind ? {tailwind} :'px-4 py-1 text-xs font-thin text-white bg-gray-700 rounded-lg'} `}
        style={{
            top: coords[0] ?? "auto",
            right: coords[1] ?? "auto",
            whiteSpace: "nowrap",
            pointerEvents: 'none',
            zIndex: 20
          }}>
            <span className="!whitespace-nowrap">{text}</span>
          
        </div>
      )}
    </div>
  );
};

export default Tooltip;