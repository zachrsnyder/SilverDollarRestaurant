'use client'
import {useState, useEffect} from 'react'
import {ChevronRight, ChevronLeft} from 'lucide-react'
import { JobSection } from './JobsSection'
import { ID } from '@/lib/types/ID'
import { JobPostingMetadata } from '@/lib/types/JobPostingMetadata'
import { PageType } from '@/lib/types/pageTypes'
import { db } from '@/lib/auth/client'


interface Props{
    setCurrentPage : React.Dispatch<React.SetStateAction<PageType>>

    setCurrentData : React.Dispatch<React.SetStateAction<ID>>
}




/**
 * Notes: When a doc is created, it is to be added to the postings array
 * 
 * 
 */

const LeftDashboard : React.FC<Props> = ({setCurrentPage, setCurrentData}) => {
    
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    //handling job posting metadata
    

  

    // Function to toggle the sidebar open or closed
    const toggleAside = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
    <div className='absolute left-0 top-20 bottom-0 flex text-[var(--text-color)] z-10'>
      <div className={`h-full z-10 transition-all duration-300 bg-gray-300 ${
          isCollapsed ? 'w-0 p-0 overflow-hidden' : 'w-[25vw]'} shadow-2xl flex flex-col`}>
            <JobSection setCurrentData={setCurrentData} setCurrentPage={setCurrentPage}/>
      </div>
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