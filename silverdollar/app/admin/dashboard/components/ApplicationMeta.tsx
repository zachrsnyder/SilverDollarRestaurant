import { Application } from "@/lib/types/Application"


interface ApplicationProps {
    app: Application;
}

export default function ApplicationMeta({app} : ApplicationProps) {

    return (
        <div className='w-full rounded-sm bg-gray-500 flex flex-col sm:flex-row justify-between py-2 px-3 cursor-pointer'>
            <div className='text-sm md:text-lg font-arvo'>{app.name}</div>
            <div className='text-sm md:text-md'>{app.submittedAt.toDateString()}</div>
        </div>
    )
}