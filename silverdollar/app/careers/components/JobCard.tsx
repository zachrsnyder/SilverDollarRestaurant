import { ClientJobPostingMeta } from '@/lib/types/ClientJobPostingMeta'
import { JobPostingMetadata } from '@/lib/types/JobPostingMetadata'
import { Dialog } from '@mui/material'
import {useState} from 'react'

interface Props {
    job : ClientJobPostingMeta
}

// TODO: FIX MODALS IN ADMIN DASHBOARD


const JobCard = ({job} : Props) => {
  const [open, setOpen] = useState(false);
  const handleCardClick = () => {
    console.log(`Open modal for ${job.title}`)
  }

  return (
    <>
    <div key={job.id} className={`flex flex-col md:flex-row group h-full w-full justify-between items-center px-3 rounded-md bg-gray-400 hover:text-red-800`}
        onClick={()=>{handleCardClick()}}
    >
        <div className='text-lg xl:text-xl font-arvo font-bold'>
            {job.title}
        </div>
        <div className='xl:text-lg font-arvo text-gray-600'>
          {job.type}
        </div>
        
    </div>
    </>
  )
}

export default JobCard