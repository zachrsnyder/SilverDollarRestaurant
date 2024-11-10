'use client'
import { useEffect, useState } from 'react'
import { db } from '@/firebase.config' 
import { collection, getDocs } from 'firebase/firestore'


interface Job {
  id: string
  title: string
  type: string // full-time, part-time, etc.
  postedDate: string
  status: string // open, closed, etc.
}

export default function CareersPage() {
    console.log("Earth to careers")
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const jobsCollection = collection(db, 'jobs')
          const jobSnapshot = await getDocs(jobsCollection)
          const jobList = jobSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Job[]
          setJobs(jobList)
        } catch (error) {
          console.error('Error fetching jobs:', error)
        } finally {
          setLoading(false)
        }
      }
  
      fetchJobs()
    }, [])
  
    if (loading) {
      return <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-600">
            Job postings lul
          </p>
        </div>
      </div>
    )
  }