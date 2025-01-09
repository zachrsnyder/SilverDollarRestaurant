'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ClientJobPosting } from '@/lib/types/ClientJobPostingMeta'
import { Modal, Paper, Skeleton } from '@mui/material'
import { useClientPostingsSubscription } from '@/lib/util/useClientPostingSubscription'
import JobCard from './JobCard'
import { BaseModal } from '@/lib/util/BaseModal'
import { X } from 'lucide-react'
import { Application, Education } from '@/lib/types/Application'
import DialogWrapper from '@/lib/util/DialogWrapper'
import { submitApplication } from './sendApp'
import { ID } from '@/lib/types/ID'
import _ from 'lodash'
import PillNotification from '@/lib/util/PillNotification'


const emptyApp : Application = {
  name: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  referredBy: '',
  startDate: '',
  currentlyEmployed: false,
  canInquire: false,
  submittedAt: new Date(),
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
  resume: null,
  resumeURL: null,
  status: 'pending'
}

export default function JobsTableWithModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedJob, setSelectedJob] = useState<ClientJobPosting | null>(null)
  const skeletonCnt = 10;
  const {postings, loading, error} = useClientPostingsSubscription()
  const [application, setApplication] = useState<Application>(emptyApp)
  const dialog = useRef<HTMLDialogElement>(null)

  const jobDialog = useRef<HTMLDialogElement>(null)

  const [popover, setPopover] = useState<{isOpen: boolean, colorTailwind: string, message: string}>({
    isOpen: false,
    colorTailwind: '',
    message: ''
  });
  

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
      setApplication(emptyApp);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
      setApplication(prev => {
  
        if(!prev) return prev
  
        if(type == "file" && e.target.files) {
            return {
                ...prev,
                resume: e.target.files[0]
            }
        }
        return {
          ...prev,
          [name]: type === 'checkbox' ? checked : value
      }});
  };
  
    const handleEducationChange = (
      level: keyof Application['education'],
      field: keyof Education,
      value: string | boolean
    ): void => {
      setApplication(prev => {
          if(!prev) return prev;
          return {
              ...prev,
              education: {
                  ...prev.education,
                  [level]: {
                  ...prev.education[level],
                  [field]: value
                  }
              }
          }
      });
    };
  
    const handleSubmit = async(e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      console.log(application);

      const { status } = await submitApplication(application.resume, selectedJob?.id, application)

      switch(status){
        case 200: {
          setPopover({
            isOpen: true,
            colorTailwind: 'rgba(114,230,83,30)',
            message: 'Application Submitted!'
          })
          setApplication(emptyApp)
          setSelectedJob(null)
        }
        case 400: {
          setPopover({
            isOpen: true,
            colorTailwind: 'rgba(230,60,47,30)',
            message: 'Application Failed to Submit.'
          })
        }

      }
    };


  return (
    <>
      <PillNotification values={popover} setValues={setPopover}/>
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
            <div className={`space-y-2 mx-auto`}>         
            {postings.map((job ) => (
              job.status == "Active" &&
            <div className='xl:w-[900px] md:w-[700px] sm:w-[500px] w-[400px] h-[100px]' key={job.id}>
                <JobCard job={job} handleJobClick={handleJobClick}/>
            </div>))}
            </div>
        ) : (
          <div className='space-y-2 mx-auto '>
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
    
    <DialogWrapper
      dialogRef={
        jobDialog
      }
      onClose={handleCloseModal}
      onFocusMiss={() => {
        const isEqual = (app1 : Application, app2 : Application) => JSON.stringify(app1) === JSON.stringify(app2)
        if(isEqual(application, emptyApp)){
          console.log(application)
          handleCloseModal();
        }else{
          dialog.current?.showModal();
        }
      }}
      className={'w-full md:w-4/5 lg:w-1/2 rounded-lg bg-white min-h-[400px] h-[95vh]'}
    >
        <div className='bg-gray-700 font-arvo h-8 relative flex justify-end text-gray-400'>
          <h2 className='absolute  -bottom-3 left-4 text-3xl  ' id="modal-title">{selectedJob?.title}</h2>
          <h2 className='text-xl mr-4'>{selectedJob?.type.charAt(0).toUpperCase()}{selectedJob?.type.slice(1)}</h2>
          <button onClick={()=>{
            handleCloseModal()
          }}
            className='mr-4'
          >
            <X size={24} className='text-gray-100 hover:text-red-500 '/>
          </button>
        </div>
        <div className='p-3 bg-white'>
          <div className='mt-6 p-2 block text-gray-500 mb-8 pb-20 border-b-4 border-gray-300'>
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
          <form onSubmit={handleSubmit}>
        <div className="text-2xl font-bold text-gray-800 border-b pb-2">
          <div>Apply</div>
          
          <span className="text-sm font-normal text-gray-600 ml-4">
            PRE-EMPLOYMENT QUESTIONNAIRE |
            EQUAL OPPORTUNITY EMPLOYER
          </span>
        </div>

        {/* Personal Information */}
        <div className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className='md:col-span-2'>
              <label className="block text-sm font-medium text-gray-600">Name (Last Name, First)</label>
              <input
                type="text"
                name="name"
                value={application?.name}
                onChange={handleChange}
                className="mt-1 block w-full text-black rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={application?.address}
                onChange={handleChange}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">City</label>
              <input
                type="text"
                name="city"
                value={application?.city}
                onChange={handleChange}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">State</label>
              <input
                type="text"
                name="state"
                value={application?.state}
                onChange={handleChange}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">ZipCode</label>
              <input
                type="text"
                name="zipCode"
                value={application?.zipCode}
                onChange={handleChange}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Employment Desired */}
        <div className="space-y-4  mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Employment Desired</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Date You Can Start</label>
              <input
                type="date"
                name="startDate"
                value={application?.startDate}
                onChange={handleChange}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="currentlyEmployed"
                checked={application?.currentlyEmployed}
                onChange={handleChange}
                className="rounded accent-gray-100 border-gray-300  focus:ring-blue-500"
                style={{
                  backgroundColor: '#f3f4f6',
                  accentColor: '#f3f4f6'
                }}
              />
              <label className="text-sm text-gray-600">Are you employed now?</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="canInquire"
                checked={application?.canInquire}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-600">May we inquire of your present employer?</label>
            </div>
          </div>
        </div>

        {/* Education History */}
        <div className="space-y-4  mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Education History</h2>
          <div className="grid grid-cols-1 gap-4">
            {(['highSchool', 'college', 'trade'] as const).map((level) => (
              <div key={level} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">
                    {level === 'highSchool' ? 'High School' : 
                    level === 'college' ? 'College' : 
                    'Trade, Business, or Correspondence School'}
                  </label>
                  <input
                    type="text"
                    value={application?.education[level].name}
                    onChange={(e) => handleEducationChange(level, 'name', e.target.value)}
                    className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Years Attended</label>
                  <input
                    type="text"
                    value={application?.education[level].years}
                    onChange={(e) => handleEducationChange(level, 'years', e.target.value)}
                    className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Graduated?</label>
                  <input
                    type="checkbox"
                    checked={application?.education[level].graduated}
                    onChange={(e) => handleEducationChange(level, 'graduated', e.target.checked)}
                    className="mt-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Information */}
        <div className="space-y-4  mt-4">
          <h2 className="text-lg font-semibold text-gray-700">General Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Subject of Special Study/Research Work</label>
              <input
                type="text"
                name="specialStudy"
                value={application?.specialStudy}
                onChange={handleChange}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Special Training</label>
              <input
                type="text"
                name="specialTraining"
                value={application?.specialTraining}
                onChange={handleChange}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Special Skills</label>
              <input
                type="text"
                name="specialSkills"
                value={application?.specialSkills}
                onChange={handleChange}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">U.S. Military or Naval Service</label>
                <input
                  type="text"
                  name="militaryService"
                  value={application?.militaryService}
                  onChange={handleChange}
                  className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Rank</label>
                <input
                  type="text"
                  name="militaryRank"
                  value={application?.militaryRank}
                  onChange={handleChange}
                  className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resume upload */}
        <div className='pt-4'>
          <input
              type='file'
              name='resume'
              accept='.pdf, .doc'
              onChange={handleChange}
              className=''
              required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
    </DialogWrapper>
    
    
    <dialog ref={dialog} className="p-6 rounded-lg shadow-xl">
      <div>
        <h2 className="text-xl font-bold mb-4">Leave without applying?</h2>
        <p className="mb-6">Leave without confirming your application?</p>
        
        <div className="flex gap-4 justify-end">
          <button 
            value="cancel"
            onClick={()=>{dialog.current?.close()}}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button 
            value="confirm"
            onClick={()=>{handleCloseModal()
              dialog.current?.close()
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Leave
          </button>
        </div>
      </div>
    </dialog>
  </> 
)}