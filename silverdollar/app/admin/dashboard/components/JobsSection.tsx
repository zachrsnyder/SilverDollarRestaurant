import { Plus, Briefcase } from 'lucide-react';
import {useState} from 'react'
import { PageType } from '@/lib/types/pageTypes';
import { ID } from '@/lib/types/ID';
import {usePostingsSubscription} from '@/lib/util/usePostingSubscription'

//TODO: View and edit potential styling issues with job cards

interface Props {

    setCurrentPage : React.Dispatch<React.SetStateAction<PageType>>

    setCurrentData : React.Dispatch<React.SetStateAction<ID>>
}

export const JobSection = ({setCurrentData, setCurrentPage} : Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const {postings, loading} = usePostingsSubscription();
    return(
<div className='flex flex-col relative'>
  <div className="flex items-center justify-between p-4 border-b border-white/10">
    <div 
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="flex items-center space-x-3 cursor-pointer group"
    >
      <div className="p-2 rounded-lg bg-white/5 text-black group-hover:bg-white/10 transition-colors">
        <Briefcase className="" size={20} />
      </div>
      <h3 className="text-lg font-sans font-bold ">Job Postings</h3>
    </div>
    <button 
    onClick={() => {
        setCurrentData("add")
        setCurrentPage("Job Postings")
    }}
    className="p-2 rounded-full hover:bg-white/10 transition-colors group"
    >
        <Plus className="text-black/70 group-hover: transition-colors" size={20} />
    </button>
  </div>
  <div>
      {isOpen && (
        <div className="p-4 space-y-4 flex flex-col">
            {loading ? (
            <div className="text-black/70 text-center py-4">Loading...</div>
            ) : (
            <>
              {postings.map(posting => (
                <div key={posting.id} className='flex mx-2 w-full justify-between h-32 rounded-md bg-stone-400/50 hover:text-red-800'>
                  <div className='text-xl font-arvo'>
                    {posting.title}
                  </div>
                  <div>
                    {posting.status == "Active" ? <div className='text-green-400'>Active</div> : <div className='text-gray-600'>Archived</div>}
                  </div>
                </div>
              ))}
            </>
            )}
      </div>
      )}
  </div>
  </div>
)};