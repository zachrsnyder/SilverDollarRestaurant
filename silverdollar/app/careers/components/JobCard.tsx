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
    <div key={job.id} className={`flex flex-col md:flex-row group h-full w-full justify-between items-center px-3 rounded-md bg-gray-300 hover:bg-gray-200 cursor-pointer`}
      onClick={() =>{handleJobClick(job)}}
    >
        <div className='text-lg xl:text-xl font-arvo font-bold'>
            <span>{job.title}&nbsp;&nbsp;|</span><span className='xl:text-lg font-arvo text-gray-600'>&nbsp;&nbsp;&nbsp;&nbsp;{job.type}</span>
        </div>  
    </div>
    </>
  )
}

export default JobCard