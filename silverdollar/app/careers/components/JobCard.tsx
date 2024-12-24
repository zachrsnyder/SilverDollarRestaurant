import { ClientJobPosting } from '@/lib/types/ClientJobPostingMeta'
import { JobPostingMetadata } from '@/lib/types/JobPostingMetadata'
import { Dialog } from '@mui/material'
import Link from 'next/link'
import { SetStateAction } from 'react'


interface Props {
    job : ClientJobPosting,

    handleJobClick: Function

}


const JobCard = ({job, handleJobClick} : Props) => {
  

  return (
    <>
    <div key={job.id} className={`flex flex-col md:flex-row group h-full w-full justify-between items-center px-3 rounded-md bg-gray-400 hover:text-red-800`}
      onClick={() =>{handleJobClick(job)}}
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