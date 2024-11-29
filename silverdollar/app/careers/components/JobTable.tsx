'use client'
import {useEffect, useState} from 'react'

import { db } from '@/lib/auth/client' 
import { collection, getDocs } from 'firebase/firestore'
import JobCard from './JobCard'
import { JobPostingMetadata } from '@/lib/types/JobPostingMetadata'
import { usePostingsSubscription } from '@/lib/util/usePostingSubscription'
import { Skeleton } from '@mui/material'
import { useClientPostingsSubscription } from '@/lib/util/useClientPostingSubscription'


// TODO: Go into the admin side and make a dasboard on mount script to update # of applications. I dont want to modify the write privileges for the collection.

const JobTable = () => {

  const skeletonCnt = 10;
  const {postings, loading, error} = useClientPostingsSubscription()
  
  return (
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
                <JobCard job={job}/>
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
  )
}

export default JobTable