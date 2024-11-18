'use client'
import {SetStateAction, useState} from 'react'
import {ChevronRight, ChevronLeft} from 'lucide-react'

interface Props{
    setCurrentPage : React.Dispatch<React.SetStateAction<any>>

    
    
}

const LeftDashboard : React.FC<Props> = ({setCurrentPage}) => {
    
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isHovered, setIsHovered] = useState(false);

    // Function to toggle the sidebar open or closed
    const toggleAside = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
    <div className='absolute left-0 top-20 bottom-0 flex text-[var(--text-color)] z-10'>
      <aside className={`h-full z-10 transition-all duration-300 bg-gray-300 ${
          isCollapsed ? 'w-0 p-0' : 'w-[25vw]'} shadow-2xl`}>
      </aside>
      <div className='h-full items-center relative flex justify-center'>
        <div className="w-[1vw] h-[4vw] bg-gray-500 rounded-r-full justify-center align-middle items-center flex z-10" style={{ opacity: isHovered ? .90 : .20, color: 'black' }} onClick={toggleAside} onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {isCollapsed ? (<ChevronRight color='black' size={24}/>) : (<ChevronLeft color='black' size={24}/>) }
        </div>
      </div>
    </div>
  )
}

export default LeftDashboard