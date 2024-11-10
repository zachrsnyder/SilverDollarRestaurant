import {Job} from '../../../lib/types/Job'

interface Props {
    job : Job
}

const JobCard = ({job} : Props) => {
  return (
    <div className='flex justify-evenly flex-col w-full h-[200px] bg-gray-300 border-t-2 border-black'>
        <div>
            <h1>{job.title}</h1>
        </div>
    </div>
  )
}

export default JobCard