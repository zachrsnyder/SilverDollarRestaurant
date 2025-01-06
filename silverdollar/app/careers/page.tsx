'use server'
import JobTable from './components/JobTable'

export default async function CareersPage() {
    console.log("Earth to careers")
    
    return (
      <div className="mx-auto px-4 py-8">
        <div className="text-center mt-20">

          {/* <Image
            src='/images/foh-trim.jpg'
            alt='Front of house image.'
            width={765}
            height={799}
            priority
          /> */}
          <h1 className="text-4xl text-red-800 font-bold font-arvo mb-4">Join Our Team!</h1>
          <p className="text-lg text-gray-600 mb-6">
            At Silver Dollar we value our team and their vital contributions to making things happen! Here you can find and apply to all of our available job postings. 
          </p>
          <div>
            <JobTable />
          </div>
          
        </div>
        
      </div>
    )
  }