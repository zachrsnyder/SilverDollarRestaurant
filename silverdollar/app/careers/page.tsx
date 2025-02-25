import { ClientJobPosting } from '@/lib/types/ClientJobPostingMeta'
import fetchJobs from './components/fetchJobs'
import JobTable from './components/JobTable'
import { CircleAlert } from 'lucide-react'


export const dynamic = 'force-dynamic'
export const revalidate = 86400

async function getJobs() {
  const jobs = await fetchJobs()
  if(jobs.success){
    if(typeof jobs.body !== 'string'){
      const postings = jobs.body as ClientJobPosting[]
      return postings
    }else{
      return jobs.body;
    }
  }else{
    return null;
  }
}



export default async function CareersPage() {
    
  const jobs = await getJobs();


    
  return (
    <div className="mx-auto px-4 py-8 height-[80vh] min-h-[80vh]">
      <div className="text-center mt-20">

        
        <h1 className="text-4xl text-red-800 font-bold font-arvo mb-4">Join Our Team!</h1>
        <p className="text-lg text-gray-600 mb-6">
          At Silver Dollar's we value our team and their vital contributions to making things happen! Here, you can find and apply to all of our available job postings. 
        </p>

        {jobs === null || typeof jobs === 'string' ? 
          <div className='container flex flex-col justify-center items-center'>
            <div className='text-gray-500 text-xl flex text-center items-center'><CircleAlert size={22}/>&nbsp;&nbsp;&nbsp;No job postings found at this time.</div>
            <div className='xl:w-[600px] md:w-[400px] sm:w-[300px] w-[200px]'>

            <img className='object-cover'
              src={'/images/ONZ74P0.jpg'}
              alt={"No postings found doodle image"}
            />
            </div>
            <a href="http://www.freepik.com" className='text-xs text-gray-400'>Designed by Dooder / Freepik</a>
          </div>
          :
          <div>
            <JobTable postings={jobs as ClientJobPosting[]} />
          </div>
        }
        
        
      </div>
      
    </div>
  )
}