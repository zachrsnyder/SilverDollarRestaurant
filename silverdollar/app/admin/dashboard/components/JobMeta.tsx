import React, { useState } from 'react'
import { JobPostingMetadata } from '@/lib/types/JobPostingMetadata'
import { Trash2, BookPlus, Eye, EyeOff } from 'lucide-react'
import { usePageData } from './CurrentContext'
import { db } from '@/lib/auth/client'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import DeleteConfirmationModal from './DeleteModal'
import PostModal from './PostModal'
import ArchiveModal from './ArchiveModal'

interface Props{
    meta: JobPostingMetadata
}

const JobMeta = ({meta}: Props) => {
    const {currentPage, setCurrentPage, currentData, setCurrentData} = usePageData();
    
    /**
     * Would probably be wise to pass this logic as props to limit duplicate functionality? But dang that would be soooo many props
     */
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isPostOpen, setIsPostOpen] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

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
            setIsDeleteOpen(false);
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
            setIsPostOpen(false);
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
            setIsArchiveOpen(false);
        }
    }



    const onDeleteModalClose = () => {
        setIsDeleteOpen(false)
    }

    const onDeleteClick = () => {
        setIsDeleteOpen(true)
    }

    const handlePostClick = () => {
        setIsPostOpen(true)
    }

    const onPostModalClose = () => {
        setIsPostOpen(false)
    }

    const handleArchiveClick = () => {
        setIsArchiveOpen(true)
    }

    const handleArchiveModalClose = () => {
        setIsArchiveOpen(false);
    }
  return (
    <>
    <div key={meta.id} className={`flex group w-full justify-between items-center h-11 px-3 rounded-md bg-stone-400/50 hover:text-red-800`}>
        <div className='text-xl font-arvo'>
            {meta.title}
        </div>
        <div className='flex space-x-2'>
            <div className={`overflow-hidden transition-[width] duration-700 w-[0vw] group-hover:w-[4vw] flex space-x-4`}
                
            >
                <div onClick={()=>{onDeleteClick()}}><Trash2 size={22}/></div>
                {(meta.status == "Draft" || meta.status == "Archived") && (<div  onClick={() => {handlePostClick()}} className='text-green-600'><BookPlus size={22}/></div>)}
                {meta.status == "Active" && (<div  onClick={() => {handleArchiveClick()}} className='text-gray-600'><EyeOff size={22}/></div>)}
            </div>
            <div>
                {meta.status == "Active" ? <div className='text-green-400'>Active</div> : <div className='text-gray-600'>{meta.status}</div>}
            </div>
        </div>
        
    </div>
    
    {/*Modals. It could even be more efficient to make "ConfirmationModal" component with an extra passed prop being description so because all of these modals are very similar */}
    <DeleteConfirmationModal isOpen={isDeleteOpen} onClose={onDeleteModalClose} onConfirm={handleDelete} title={meta.title}/>
    <PostModal isOpen={isPostOpen} onClose={onPostModalClose} onConfirm={handlePost} title={meta.title}/>
    <ArchiveModal isOpen={isArchiveOpen} onClose={handleArchiveModalClose} onConfirm={handleArchive} title={meta.title}/>
    </>
  )
}

export default JobMeta