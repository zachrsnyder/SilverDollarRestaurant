'use client'
import {useEffect, useState} from 'react'
import { Job } from '../../../lib/types/Job'
import { db } from '@/firebase.config' 
import { collection, getDocs } from 'firebase/firestore'
import JobCard from './JobCard'


const jobTest : Job[] = [
    {id: '1', title: "busser", type: "part-time", postedDate: "Today", status: "open"},
    {id: '2', title: "busser", type: "part-time", postedDate: "Today", status: "open"},
    {id: '3', title: "busser", type: "part-time", postedDate: "Today", status: "open"},
    {id: '4', title: "busser", type: "part-time", postedDate: "Today", status: "open"},
    {id: '5', title: "busser", type: "part-time", postedDate: "Today", status: "open"},
]


const JobTable = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const fetchJobs = async () => {
        try {
        //   const jobsCollection = collection(db, 'jobs')
        //   const jobSnapshot = await getDocs(jobsCollection)
        //   const jobList = jobSnapshot.docs.map(doc => ({
        //     id: doc.id,
        //     ...doc.data()
        //   })) as Job[]
        //   setJobs(jobList)
        setJobs(jobTest)
        } catch (error) {
          console.log('Error fetching jobs:', error)
        } finally {
          setLoading(false)
        }
      }
  
      fetchJobs()
    }, [])

    
  
    if (loading) {
      return <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    }
  


  return (
    <div className="flex flex-col w-10/12 sm:w-4/5 overflow-auto mx-auto">
        {/*Results header*/}
        <div className='flex justify-start'>
            <p className='ml-4 my-2'>{jobs.length} Results</p>
        </div>
        {jobs.map((job ) => (
        <div key={job.id}>
            <JobCard job={job}/>
        </div>
        ))}
    </div>
  )
}

export default JobTable