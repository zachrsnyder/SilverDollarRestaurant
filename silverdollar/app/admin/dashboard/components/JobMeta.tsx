import { useRef, useState } from 'react'
import { JobPostingMetadata } from '@/lib/types/JobPostingMetadata'
import { Trash2, BookPlus, Eye, EyeOff } from 'lucide-react'
import { usePageData } from './CurrentContext'
import { db } from '@/lib/auth/client'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import DeleteConfirmationModal from './DeleteModal'
import PostModal from './PostModal'
import ArchiveModal from './ArchiveModal'
// import Tooltip from '@/lib/util/Tooltip'
import SaveConfirmationModal from './SaveModal'
import { useJobWithApplications } from '@/lib/util/useJobWithApplications'
import Tooltip from '@mui/material/Tooltip';

interface Props{
    meta: JobPostingMetadata
}

const JobMeta = ({meta}: Props) => {
    const {currentPage, setCurrentPage, currentData, setCurrentData} = usePageData();
    const {job, setJob, originalJob, updateOriginalJob, applications, loading, error, refreshData} = useJobWithApplications(currentData);
    const archiveRef = useRef<HTMLDialogElement>(null);
    const deleteRef = useRef<HTMLDialogElement>(null);
    const postRef = useRef<HTMLDialogElement>(null);
    
    /**
     * Would probably be wise to pass this logic as props to limit duplicate functionality? But dang that would be soooo many props
     */




    // const handleSave = async() => {
    //     try{
    //         //this totally saves the id in the data(), but oh well this has no reprocaution as far as I can tell.
    //         const docRef = doc(db, "jobPostings", `${job?.id}`);
    //         await updateDoc(docRef, {
    //             ...job
    //         })
    //         setIsSaveOpen(false)
    //         handleNavigateAfterSave();
    //     }catch(error : any){
    //         console.log("Error updating document.");
    //         console.log(error);
    //     }
    // }

    const handleDelete = async() => {
        try{
            const docRef = doc(db, "jobPostings", `${meta.id}`);
            await deleteDoc(docRef)
            if(currentData == meta.id && currentPage == "Job Postings"){
                setCurrentData(null);
                setCurrentPage("Welcome");
            }
            console.log("Document Deleted Successfully");
        }catch(err : any){
            console.log("Error deleting job posting document.")
        }finally{
            onDeleteModalClose();
        }
    }

    const handlePost = async() => {
        try{
            const docRef = doc(db, "jobPostings", `${meta.id}`);
            await updateDoc(docRef, {
                status: "Active"
            })
        }catch(error: any){
            console.log("Error setting post status to active");
            console.log(error);
        }finally{
            onPostModalClose()
        }
    }

    const handleArchive = async() => {
        try{
            const docRef = doc(db, "jobPostings", `${meta.id}`);
            await updateDoc(docRef, {
                status: "Archived"
            })
            
        }catch(error: any){
            console.log("Error setting post status to active");
            console.log(error);
        }finally{
            handleArchiveModalClose();
        }
    }



    const onDeleteModalClose = () => {
        document.body.style.overflow = 'unset';
        deleteRef.current?.close()
    }

    const onDeleteClick = () => {
        document.body.style.overflow = 'hidden'
        deleteRef.current?.showModal();
    }

    const handlePostClick = () => {
        document.body.style.overflow = 'hidden'
        postRef.current?.showModal();
    }

    const onPostModalClose = () => {
        document.body.style.overflow = 'unset'
        postRef.current?.close();
    }

    const handleArchiveClick = () => {
        document.body.style.overflow = 'hidden'
        archiveRef.current?.showModal();
    }

    const handleArchiveModalClose = () => {
        document.body.style.overflow = 'unset'
        archiveRef.current?.close();
    }

    const handleCardClick = () => {
        // // If we're already looking at this job, no need to do anything
        // if (currentData === meta.id) return;
    
        // // If we have unsaved changes on the CURRENT job (not the one we're clicking)
        // if (job && originalJob && !areJobPostingsEqual(job, originalJob)) {
        //     setIsSaveOpen(true);
        //     return;
        // }
    
        // If no unsaved changes, navigate to the new job
        setCurrentPage("Job Postings"); 
        setCurrentData(meta.id);
    };

    // const handleSaveModalClose = () => {
    //     setIsSaveOpen(false);
    //     setCurrentPage("Job Postings");
    //     setCurrentData(meta.id);
    // };
    
    // const handleNavigateAfterSave = () => {
    //     setCurrentPage("Job Postings");
    //     setCurrentData(meta.id);
    // };
  return (
    <>
    <div key={meta.id} className={`flex flex-col min-h-11 md:flex-row group w-full justify-between items-center px-3 rounded-sm bg-gray-500 hover:text-red-800 overflow-hidden cursor-pointer`}
        onClick={()=>{handleCardClick()}}
    >
        <div className='text-sm xl:text-xl font-arvo'>
            {meta.title}
        </div>
        <div className='flex flex-col lg:flex-row space-x-2'>
            <div className={`overflow-hidden group-hover:overflow-visible transition-[width] duration-700 w-[0vw] group-hover:w-14 flex space-x-2`}
                
            >
                <Tooltip title={'Delete'} placement='top'><div onClick={()=>{onDeleteClick()}}><Trash2 size={22}/></div></Tooltip>
                {(meta.status == "Draft" || (meta.status == "Archived")) && (<Tooltip title={'Post Job'} placement='top'><div  onClick={() => {handlePostClick()}} className='text-green-600 text-xs text-nowrap whitespace-nowrap inline-block min-w-max'><BookPlus size={22}/></div></Tooltip>)}
                {meta.status == "Active" && (<Tooltip title={"Archive Post"} placement='top'><div onClick={() => {handleArchiveClick()}} className='text-gray-600'><EyeOff size={22}/></div></Tooltip>)}
            </div>
            <div className='z-10 bg-gray-500'>
                {meta.status == "Active" ? <div className='text-green-400 w-11 text-end'>Active</div> : <div className='text-gray-600 w-14 text-end'>{meta.status}</div>}
            </div>
        </div>
        
    </div>
    
    {/*Modals. It could even be more efficient thao make "ConfirmationModal" component with an extra passed prop being description so because all of these modals are very similar */}
    <DeleteConfirmationModal dialogRef={deleteRef} onClose={onDeleteModalClose} onConfirm={handleDelete} title={meta.title}/>
    <PostModal dialogRef={postRef} onClose={onPostModalClose} onConfirm={handlePost} title={meta.title}/>
    <ArchiveModal dialogRef={archiveRef} onClose={handleArchiveModalClose} onConfirm={handleArchive} title={meta.title}/>
    {/* <SaveConfirmationModal 
        isOpen={isSaveOpen} 
        onClose={handleSaveModalClose}
        onConfirm={handleSave}
        title={job?.title || ''}
    /> */}

    </>
  )
} 

export default JobMeta