'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ClientJobPosting } from '@/lib/types/ClientJobPostingMeta'
import { Modal, Paper, Skeleton } from '@mui/material'
import { useClientPostingsSubscription } from '@/lib/util/useClientPostingSubscription'
import JobCard from './JobCard'
import { BaseModal } from '@/lib/util/BaseModal'
import { X } from 'lucide-react'
import ApplicationPage from './Application'
import { Application } from '@/lib/types/Application'



export default function JobsTableWithModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedJob, setSelectedJob] = useState<ClientJobPosting | null>(null)
  const skeletonCnt = 10;
  const {postings, loading, error} = useClientPostingsSubscription()
  const [application, setApplication] = useState<Application | undefined>()
  const [openApp, setOpenApp] = useState<boolean>(false)

  const dialog = useRef<HTMLDialogElement>(null)
  

  // Handle URL params for modal
  useEffect(() => {
    const jobId = searchParams.get('jobId')
    if (jobId) {
      const job = postings.find(j => j.id === jobId)
      setSelectedJob(job || null)
    } else {
      setSelectedJob(null)
    }
  }, [searchParams, postings])

  const handleJobClick = (job: ClientJobPosting) => {
    // Update URL with jobId
    const params = new URLSearchParams(searchParams)
    params.set('jobId', job.id as string)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCloseModal = () => {
    // Remove jobId from URL
    setSelectedJob(null)
    const params = new URLSearchParams(searchParams)
    params.delete('jobId')
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCloseApplication = () => {
    setApplication({
      name: '',
      ssn: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      referredBy: '',
      position: '',
      startDate: '',
      currentlyEmployed: false,
      canInquire: false,
      appliedBefore: false,
      appliedWhere: '',
      appliedWhen: '',
      education: {
        highSchool: { name: '', years: '', graduated: false, subjects: '' },
        college: { name: '', years: '', graduated: false, subjects: '' },
        trade: { name: '', years: '', graduated: false, subjects: '' }
      },
      specialStudy: '',
      specialTraining: '',
      specialSkills: '',
      militaryService: '',
      militaryRank: '',
      resume: null
    })
    setOpenApp(false)
  }

  

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
        {!loading ? (
            <div className={`space-y-2 mx-auto ${postings.length < 5 ? '' : 'overflow-y-scroll'}`}>         
            {postings.map((job ) => (
              job.status == "Active" &&
            <div className='xl:w-[900px] md:w-[700px] sm:w-[500px] w-[400px] h-[100px]' key={job.id}>
                <JobCard job={job} handleJobClick={handleJobClick}/>
            </div>))}
            </div>
        ) : (
          <div className='space-y-2 mx-auto overflow-y-scroll'>
            {  
              Array.from({length: skeletonCnt}, (_, index) => 
                (<div  key={index} >
                  <Skeleton variant='rectangular' width={800} height={100}/>
                </div>)
              )
            }
          </div>
        )}
    </div>
  

    {/* Job Details Modal */}
    
    <BaseModal
      isOpen={
        selectedJob
      }
      onClose={handleCloseModal}
      className={'w-full md:w-4/5 bg-white min-h-[400px] h-[95vh]'}
    >
        <div className='bg-gray-700 font-arvo h-8 relative flex justify-end text-gray-400'>
          <h2 className='absolute  -bottom-3 left-4 text-3xl  ' id="modal-title">{selectedJob?.title}</h2>
          <h2 className='text-xl mr-4'>{selectedJob?.type.charAt(0).toUpperCase()}{selectedJob?.type.slice(1)}</h2>
          <button onClick={()=>{
            handleCloseModal()
          }}
            className='mr-4'
          >
            <X size={24} className='text-red-500 hover:text-red-400 '/>
          </button>
        </div>
        <div className='mt-6 p-2 block text-gray-500'>
          <p>
            {selectedJob?.summary}
          </p>
          <div className='grid grid-cols-3 mt-8'>
            <div>
              <label>Key Responsibilites: </label>
              <ul>
                {selectedJob?.keyResponsibilities.map((responsibility, index) => (
                  <li key={index}>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label>Requirements:</label>
              <ul className=''>
                {selectedJob?.requirements.map((requirement, index) => (
                  <li key={index}>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
            <div className='block'>
              <label>Compensation:</label>
              <p>${selectedJob?.compensation.min} - ${selectedJob?.compensation.max} {selectedJob?.compensation.period}</p>
            </div>
          </div>
        </div>
        <footer className='flex justify-center absolute bottom-0 w-full py-2'>
          <button className='py-2 px-3 bg-gray-700  hover:bg-gray-500 text-white font-arvo rounded-2xl'
            onClick={()=>{
              setApplication({
                name: '',
                ssn: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                phone: '',
                referredBy: '',
                position: '',
                startDate: '',
                currentlyEmployed: false,
                canInquire: false,
                appliedBefore: false,
                appliedWhere: '',
                appliedWhen: '',
                education: {
                  highSchool: { name: '', years: '', graduated: false, subjects: '' },
                  college: { name: '', years: '', graduated: false, subjects: '' },
                  trade: { name: '', years: '', graduated: false, subjects: '' }
                },
                specialStudy: '',
                specialTraining: '',
                specialSkills: '',
                militaryService: '',
                militaryRank: '',
                resume: null
              });
              setSelectedJob(null)
              setOpenApp(true)
            }}
          >
            Apply
          </button>
        </footer>
    </BaseModal>
    
    <ApplicationPage isOpen={openApp} onClose={handleCloseApplication} application={application} setApplication={setApplication} dialog={dialog} className='z-50'/>
    

    <dialog ref={dialog} className="p-6 rounded-lg shadow-xl">
      <form method="dialog" onSubmit={(e) => {
        // The form's submit event fires when either button is clicked
        const result = e.currentTarget.closest('dialog');
        if (result?.returnValue === 'confirm') {
          setApplication(undefined)
          dialog?.current?.close()
        }
      }}>
        <h2 className="text-xl font-bold mb-4">Leave without applying?</h2>
        <p className="mb-6">Leave without confirming your application?</p>
        
        <div className="flex gap-4 justify-end">
          <button 
            value="cancel"
            formMethod="dialog"
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button 
            value="confirm"
            type='submit'
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Leave
          </button>
        </div>
      </form>
    </dialog>
  </> 
)}