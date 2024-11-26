import { useJobWithApplications } from '@/lib/util/useJobWithApplications'
import React from 'react'
import { usePageData } from './CurrentContext';
import { Pencil, Space, View } from "lucide-react";
import Tooltip from '@/lib/util/Tooltip';
import { randomInt } from 'crypto';

const ViewPageComp = () => {
    const {currentPage, setCurrentPage, currentData, setCurrentData} = usePageData()
    const {job, applications, loading, error, refreshData} = useJobWithApplications(currentData);

    const handleEditClick = () => {
        console.log("Implement edit click");
    }


    return (
        <div className='container min-h-full block'>
            {loading ? (
                <div>
                    <div className='font-arvo text-2xl'>Loading...</div>
                </div>
            ) : (
                <>
                {!error ? (
                    <>
                    <div className='relative container h-20 pt-4 pl-5 pr-5 flex justify-between items-center'>
                        <div className='flex items-center font-arvo '><div className='text-2xl '>{job?.title}     |</div><div className='text-lg text-gray-500 pl-5'>{job?.type} </div></div>
                        <div className='flex space-x-4 mr-6'>
                            <Tooltip text={'Edit Post'} coords={[-20,-40]}>
                                <button className='text-gray-600'
                                    onClick={() => {handleEditClick()}}
                                >
                                    <Pencil size={26} />
                                </button>
                            </Tooltip>
                            <Tooltip text={'On Site Perspective'} coords={[-20,-90]}>
                                <button className='text-gray-600'
                                    onClick={() => {handleEditClick()}}
                                >
                                    <View size={26} />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='container min-h-screen block'>
                        <div className='mx-4 mb-6 border-2 px-2 py-1 border-gray-400/50 rounded-lg'>
                            <span>{job?.summary}</span>
                        </div>
                        <div className='flex flex-wrap px-6 justify-between gap-y-8'>
                            <div className='w-72 h-80 bg-gray-300 rounded-lg flex flex-col space-y-2'>
                                <div className='text-xl text-center pt-3 text-font-arvo'>Responsibilities</div>
                                <div className='mx-auto bg-gray-50 w-64 rounded-lg h-64 overflow-y-scroll'>
                                    {job?.keyResponsibilities.map(key => (
                                        <div key={key} className='text-center pt-2 pb-1 hover:bg-gray-500/50 mx-3 border-b-2 border-gray-600/40 rounded-md'>{key}</div>
                                    ))}

                                </div>
                            </div>
                            <div className='w-72 h-80 bg-gray-300 rounded-lg flex flex-col space-y-2'>
                                <div className='text-xl text-center pt-3 text-font-arvo'>Requirements</div>
                                <div className='mx-auto bg-gray-50 w-64 rounded-lg h-64 overflow-y-scroll'>
                                    {job?.requirements.map(requirement => (
                                        <div key={requirement} className='text-center pt-2 pb-1 hover:bg-gray-500/50 mx-3 border-b-2 border-gray-600/40 rounded-md'>{requirement}</div>
                                    ))}

                                </div>
                            </div>
                            <div className='w-72 h-80 bg-gray-300 rounded-lg flex flex-col space-y-2'>
                                <div className='text-xl text-center pt-3 text-font-arvo'>Compensation</div>
                                <div className='mx-auto bg-gray-50 w-64 pl-6 rounded-lg h-64 flex flex-col justify-evenly'>
                                    <div><b>Maximum:</b> {job?.compensation.max}</div>
                                    <div><b>Minimum:</b> {job?.compensation.min}</div>
                                    <div><b>Time Frame:</b> {job?.compensation.period}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center pt-6 px-4'>
                            <div className='items-center align-middle text-center'>
                                {job?.applications} Applicants
                            </div>
                            <div className='text-gray-500 text-end text-sm'>
                                <div>
                                    Created At: {job?.createdAt.toDate().toLocaleDateString()}
                                </div>
                                <div>
                                    Last Updated At: {job?.updatedAt.toDate().toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                ) : (
                    <div className='text-red-500'>{error?.message}</div>
                )}
                </>
            )}
        </div>
    )
}

export default ViewPageComp