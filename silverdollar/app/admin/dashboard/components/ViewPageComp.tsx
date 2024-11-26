import { useJobWithApplications } from '@/lib/util/useJobWithApplications'
import { usePageData } from './CurrentContext';
import { Trash2, View } from "lucide-react";
import Tooltip from '@/lib/util/Tooltip';
import EditableWrapper from '@/lib/util/EditableText';
import NumberEditableWrapper from '@/lib/util/EditableNumber';
import EditableSelectWrapper from '@/lib/util/EditableSelect';
import { JobType } from '@/lib/types/JobPosting';
import EditableTextAreaWrapper from '@/lib/util/EditableTextArea';

//TODO: Document code, actually save the editting changes lol, fix enter key functionality on edit boxes. Add array add and delete to the other array mapped box (either requirements or responsibilites)


const ViewPageComp = () => {
    const {currentPage, setCurrentPage, currentData, setCurrentData} = usePageData()
    const {job, setJob, applications, loading, error, refreshData} = useJobWithApplications(currentData);

    const handleEditClick = () => {
        console.log("Implement edit click");
    }

    const addArrayItem = (field: 'keyResponsibilities' | 'requirements') => {
        setJob( job ? {...job, [field]: [...job?.[field], '']} : null)
    };


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
                        <div className='flex items-center font-arvo '>
                            <EditableWrapper
                                value={job ? job?.title : ''}
                                setValue={(newTitle : string) => setJob(job ? {...job, title: newTitle} : null)}
                                tailwind={'text-2xl'}
                            />
                            <div className='text-2xl'>|</div>
                            
                            <EditableSelectWrapper<JobType>
                                value={job ? job?.type : 'part-time'}
                                setValue={(newVal : JobType) => setJob(job ? {...job, type: newVal} : null)}
                                selectables={['contract', 'full-time', 'part-time', 'temporary']}
                                tailwind='text-lg text-gray-500 pl-3 w-28'
                            />
            
                        </div>
                        <div className='flex space-x-4 mr-6'>
                            <Tooltip text={'On Site Perspective'} coords={[-30,10]}>
                                <button className='text-gray-600'
                                    onClick={() => {handleEditClick()}}
                                >
                                    <View size={26} />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='container min-h-screen block'>
                    
                        <EditableTextAreaWrapper
                            value={job ? job.summary : ''}
                            setValue={(newValue) => {setJob(job ? {...job, summary: newValue} : null)}}
                            tailwind='mx-4 mb-6 border-2 px-2 py-1 border-gray-400/50 rounded-lg'
                        />
                        <div className='flex flex-wrap px-6 justify-between gap-y-8'>
                            <div className='w-72 h-64 bg-gray-300 rounded-lg flex flex-col space-y-2'>
                                <div className='text-xl text-center pt-3 font-arvo'>Responsibilities</div>
                                <div className='mx-auto bg-gray-50 w-64 rounded-lg h-48 overflow-y-scroll'>
                                    {job?.keyResponsibilities.map(key => (
                                        <div key={key} className='text-center pt-2 pb-1 hover:bg-gray-500/50 mx-3 border-b-2 border-gray-600/40 rounded-md'>{key}</div>
                                    ))}

                                </div>
                            </div>
                            <div className='w-72 h-64 bg-gray-300 rounded-lg flex flex-col space-y-2'>
                                <div className='text-xl text-center pt-3 font-arvo'>Requirements</div>
                                <div className='mx-auto bg-gray-50 w-64 rounded-lg h-48 overflow-y-scroll'>
                                    {job?.requirements.map((requirement, index) => (
                                        <div key={index} className='relative w-full group hover:text-red-800 text-gray-500'>
                                            <EditableWrapper
                                                value={requirement}
                                                setValue={(newVal: string) => {setJob(job ? {...job, requirements: job.requirements.map((val, i) => 
                                                    i === index ? newVal : val
                                                )} : null)}}
                                                tailwind={'h-10 min-h-10 text-center w-full pt-2 pb-1 group-hover:text-red-800 mx-3 border-b-2 border-gray-600/40 rounded-md'}
                                                coords={[0,0]}
                                            />
                                            <div id='delete' className='hidden group-hover:block absolute bottom-1 top-2 right-4'
                                                onClick={()=>{
                                                    setJob(job ? {...job, requirements: job.requirements.filter((_,i) => 
                                                        i !== index
                                                    )} : null)
                                                }}
                                            >
                                                <Trash2 size={18}/>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('requirements')}
                                        className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        + Add Requirement
                                    </button>
                                </div>
                            </div>
                            <div className='w-72 h-64 bg-gray-300 rounded-lg flex flex-col space-y-2'>
                                <div className='text-xl text-center pt-3 font-arvo'>Compensation</div>
                                <div className='mx-auto bg-gray-50 w-64 pl-6 rounded-lg h-48 flex flex-col justify-evenly'>
                                    <div className='flex items-center'>
                                        <div><b>Maximum:</b></div>
                                        <NumberEditableWrapper
                                            value={job ? job?.compensation.max : 0}
                                            setValue={(newMax : number) => setJob(job ? {...job, compensation:{
                                                ...job.compensation,
                                                max: newMax
                                            }} : null)}
                                            tailwind='w-36'
                                        />
                                    </div>
                                    <div className='flex items-center'>
                                        <div><b>Minimum:</b></div>
                                        <NumberEditableWrapper
                                            value={job ? job?.compensation.min : 0}
                                            setValue={(newmin : number) => setJob(job ? {...job, compensation:{
                                                ...job.compensation,
                                                min: newmin
                                            }} : null)}
                                            tailwind='w-36'
                                        />
                                    </div>
                                    
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
                        <div className='mx-4 my-2 min-h-[500px] bg-gray-700 rounded-lg block'>
                            <div className='text-xl font-arvo pl-3 py-2 text-white font-bold'>Applicants</div>
                            <div className='mx-6'>
                                {applications.map(application => (
                                    <div>{application.name}</div>
                                ))}
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