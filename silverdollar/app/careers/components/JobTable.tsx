'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ClientJobPosting } from '@/lib/types/ClientJobPostingMeta'
import JobCard from './JobCard'
import { ID } from '@/lib/types/ID'
import JobApplication from './JobApplication'


interface Props {
  postings: ClientJobPosting[]
}

export default function JobsTableWithModal({ postings } : Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedJob, setSelectedJob] = useState<ClientJobPosting | null>(null)
  const skeletonCnt = 10;
  const [applied, setApplied] = useState<Set<ID>>(new Set<ID>())

  const jobDialog = useRef<HTMLDialogElement>(null)

  
  

  // Handle URL params for modal
  useEffect(() => {
    const jobId = searchParams.get('jobId')
    if (jobId) {
      const job = postings.find(j => j.id === jobId)
      setSelectedJob(job || null)
      document.body.style.overflow = 'hidden';
      jobDialog.current?.showModal();
    } else {
      jobDialog.current?.close();
      document.body.style.overflow = 'unset'
      setSelectedJob(null)
      // setApplication(emptyApp);
    }
  }, [searchParams, postings])

  const handleJobClick = (job: ClientJobPosting) => {
    // Update URL with jobId
    const params = new URLSearchParams(searchParams)
    params.set('jobId', job.id as string)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCloseModal = useCallback(() => {
    // Remove jobId from URL
    
    const params = new URLSearchParams(searchParams)
    params.delete('jobId')
    router.push(`?${params.toString()}`, { scroll: false })
  }, [searchParams, router])

  
  return (
    <>
      {/* Jobs Table */}
      <div className="flex flex-col w-10/12 sm:w-4/5 mx-auto">
        {/*Results header*/}
        <div className='flex justify-start'>
          {/* {loading ?
            <p className='ml-4 my-2'>{postings.length} Results</p>
            :
            <Skeleton variant={'rectangular'}/>
          } */}
        </div>
        <div className={`space-y-2 mx-0`}>         
        {postings.map((job , index: number) => (
          job.status == "Active" && 
        // <div className='xl:w-[900px] md:w-[500px] sm:w-[400px] xs:w-[200px] h-[100px]' key={index}>
        <div className='w-full h-[100px]' key={index}>
            <JobCard job={job} handleJobClick={handleJobClick}/>
        </div>))}
        </div>
    </div>

    <JobApplication setSelectedJob={setSelectedJob} selectedJob={selectedJob} handleCloseModal={handleCloseModal} jobDialog={jobDialog} setAppliedJobs={setApplied}/>
  </> 
)}