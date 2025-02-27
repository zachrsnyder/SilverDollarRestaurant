import { Plus, Briefcase } from 'lucide-react';
import {useState} from 'react'
import {usePostingsSubscription} from '@/lib/util/usePostingSubscription'
import JobMeta from './JobMeta';
import { usePageData } from './CurrentContext';
import Tooltip from '@/lib/util/Tooltip';



export const JobSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {postings, loading} = usePostingsSubscription();
    const {currentPage, setCurrentPage, currentData, setCurrentData} = usePageData()
    return(
<div className='flex flex-col relative'>
  <div className="flex items-center justify-between p-4 border-b border-white/10">
    <div 
      className="flex items-center space-x-3 cursor-pointer group"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="p-2 rounded-lg bg-white/5 text-black group-hover:bg-white/10 transition-colors">
        <Briefcase className="" size={20} />
      </div>
      <h3 className="text-sm md:text-lg font-sans font-bold ">Job Postings</h3>
    </div>
    <Tooltip text={'Add Job'} coords={[-14,10]}>
    <button 
    onClick={() => {
        setCurrentData("add")
        setCurrentPage("Job Postings")
    }}
    className="p-2 rounded-full hover:bg-white/10 transition-colors group z-30"
    >
        <Plus className="text-black/70 group-hover: transition-colors" size={20} />
    </button>
    </Tooltip>
  </div>
  <div className='overflow-hidden'>
    <div className={`transform transition-all duration-500 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 h-0'}`}>
      
        <div className="p-4 space-y-1 flex flex-col">
            {loading ? (
            <div className="text-black/70 text-center py-4">Loading...</div>
            ) : (
            <>
              {postings.map(posting => (
                <div key={posting.id}>
                  <JobMeta meta={posting}/>
                </div>
              ))}
            </>
            )}
      </div>

    </div>
  </div>
  </div>
)};