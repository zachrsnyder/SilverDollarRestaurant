import { Application } from "@/lib/types/Application"
import DialogWrapper from "@/lib/util/DialogWrapper";
import { MoveLeft, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import PDFPreview from "./PDFPreview";
import Tooltip from "@/lib/util/Tooltip";
import { deleteDoc, doc, FirestoreError } from "firebase/firestore";
import { db } from "@/lib/auth/client";
import { ID } from "@/lib/types/ID";
import PillNotification from "@/lib/util/PillNotification";


interface ApplicationProps {
    app: Application;

    jobId: ID | undefined;
}

export default function ApplicationMeta({app, jobId} : ApplicationProps) {
    const viewRef = useRef<HTMLDialogElement>(null);

    const [popover, setPopover] = useState<{isOpen: boolean, colorTailwind: string, message: string}>({
        isOpen: false,
        colorTailwind: 'rgba(230,60,47,30)',
        message: 'Failed to delete application'
      });

    const onViewDialogClose = () => {
        document.body.style.overflow = 'unset';
        viewRef.current?.close()
    }

    const handleDeleteApplication = async() => {
        try{
            if(jobId){
                await deleteDoc(doc(db, 'jobPostings', jobId, 'applications', app.uid))
            }
            return {success: true}
        }catch(error : any){
            console.error(error)
            return {success: false, message: `Failed to delete application: ${error}`}
        }
    }

    return (
        <>
        <div className='w-full rounded-sm bg-gray-500 flex flex-col sm:flex-row justify-between py-2 px-3 cursor-pointer hover:bg-gray-400 transition-colors duration-200'
            onClick={()=>{
                document.body.style.overflow = 'hidden';
                viewRef.current?.showModal()
            }}
        >
            <div className='text-sm md:text-lg font-arvo'>{app.name}</div>
            <div className='text-sm md:text-md'>Date Submitted: {app.submittedAt?.toDate().toLocaleDateString()}</div>
        </div>
        <DialogWrapper
            dialogRef={viewRef}
            onClose={onViewDialogClose}
            className='border-[1px] border-black border-t-[28px] border-t-gray-700 w-full md:w-4/5 lg:w-1/2 rounded-lg text-black bg-white min-h-[400px] h-[95vh] p-4'
        >
            <div className="relative">
            <div className='absolute -top-8 -right-2 -left-2 flex justify-between space-x-3'>
                <Tooltip
                    text={"Back"}
                    coords={[20,-48]}
                >
                    <MoveLeft size={24} className={'text-gray-600 hover:text-blue-500'}
                        onClick={onViewDialogClose}
                    />
                </Tooltip>
                <Tooltip
                    text={"Delete Application"}
                    coords={[20, 32]}
                >
                    <Trash2 size={24} className={'text-gray-600 hover:text-red-500'}
                        onClick={async()=>{
                            const res = await handleDeleteApplication(); 
                            if(res.success === true){
                                console.log("Happening")
                                setPopover(prev => {
                                    return {
                                        ...prev,
                                        isOpen: true
                                    }
                                })
                            }
                            onViewDialogClose();
                        }}
                    />
                </Tooltip>
            </div>
            {/* personal info */}
            <div className='space-y-2 mt-6'>
                <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pl-4">
                    <div className='md:col-span-2'>
                        <label className="block text-sm font-medium text-gray-600">Name</label>
                        <div className='text-sm font-medium text-gray-600'>{app.name}</div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">Address</label>
                        <div className='text-sm font-medium text-gray-600'>{app.address}, {app.city}, {app.state} {app.zipCode}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <label className="block text-sm font-medium text-gray-600">Phone</label>
                        <div className='text-sm font-medium text-gray-600'>{app.phone}</div>
                    </div>
                    <div className='md:col-span-2'>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <div className='text-sm font-medium text-gray-600'>{app.email}</div>
                    </div>
                </div>
            </div>
            {/*Employment info*/}
            <div className='space-y-2 mt-2'>
                <h2 className="text-lg font-semibold text-gray-700">Employment Desired</h2>
                <div className='flex text-black pl-4'>
                    <div><span className='text-gray-500'>Date can start:</span> {app.startDate}&nbsp;&nbsp;&nbsp;&nbsp;<span className='text-gray-500'>Currently Employed:</span> {app.currentlyEmployed ? 'Yes' : 'No'}&nbsp;&nbsp;&nbsp;&nbsp;<span className='text-gray-500'>Can we incquire:</span> {app.canInquire ? 'Yes' : 'No'}</div>
                </div>
            </div>
            {/*Education*/}
            <div className="space-y-2  mt-4">
                <h2 className="text-lg font-semibold text-gray-700">Education History</h2>
                {(['highSchool', 'college', 'trade'] as const).map((level) => (
                    <div key={level} className="grid grid-cols-1 md:grid-cols-4 gap-4 pl-4">
                    <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-800">
                            {level === 'highSchool' ? 'High School' : 
                            level === 'college' ? 'College' : 
                            'Trade, Business, or Correspondence School'}
                        </label>
                        <div className="mt-1 block w-full text-black">{app.education[level].name}</div>
                        <div className="mt-1 block w-full text-black pl-4">
                            <div><span className='text-gray-500'>Years Attended:</span> {app.education[level].years}</div>
                            <div><span className='text-gray-500'>Graduated:</span> {app.education[level].graduated ? 'Yes' : 'No'}</div>
                        </div>
                    </div>
                    </div>
                )) }
            </div>
            {/*General Info */}
            <div className="space-y-2 mt-4">
                <h2 className="text-lg font-semibold text-gray-700">General Information</h2>
                <div className="grid grid-cols-1 gap-4 pl-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Subject of Special Study/Research Work</label>
                    <div
                        className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {app.specialStudy}
                    </div>
                    </div>
                </div>
                <div className='pl-4'>
                    <label className="block text-sm font-medium text-gray-600">Special Training</label>
                    <div
                        className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {app.specialTraining}
                    </div>
                </div>
                <div className='pl-4'>
                    <label className="block text-sm font-medium text-gray-600">Special Skills</label>
                    <div
                        className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {app.specialSkills}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 pl-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">U.S. Military or Naval Service</label>
                        <div className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            {app.militaryService}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Rank</label>
                        <div className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            {app.militaryRank}
                        </div>
                    </div>
                    </div>
                </div>
                <div className='flex justify-center align-center'>
                    <PDFPreview
                        url={app.resumeUrl}
                    />
                </div>
                </div>
                <PillNotification values={popover} setValues={setPopover}>

                </PillNotification>
        </DialogWrapper>
        </>
    )
}