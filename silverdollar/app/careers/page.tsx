import JobTable from './components/JobTable'

export default function CareersPage() {
    console.log("Earth to careers")
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-600">
            Job postings lul
          </p>
        </div>
        <JobTable />
      </div>
    )
  }