import { AuthService } from "@/lib/auth/auth";
import { AdminUser } from "@/lib/types/auth";
import DialogWrapper from "@/lib/util/DialogWrapper";
import { Menu, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

interface WorkerProps {
    meta: AdminUser
}

export function WorkerMeta({ meta } : WorkerProps){

    const [open, setOpen] = useState(false)

    const deleteRef = useRef<HTMLDialogElement>(null)

    const [message, setMessage] = useState<string | null>(null)

    const closeDeleteRef = () => {
        document.body.style.overflow = "unset"
        deleteRef.current?.close();
    }
    const openDeleteRef = () => {
        document.body.style.overflow = 'hidden'
        deleteRef.current?.showModal();
    }

    return (
        <>
            <div key={meta.userId} className={`flex flex-col min-h-11 md:flex-row group w-full justify-between items-center px-3 rounded-sm bg-gray-500 hover:text-red-800`}>
                <div className='text-lg xl:text-xl font-arvo'>
                    {meta.fName} {meta.lName}
                </div>
                <div className='flex flex-col md:flex-row space-x-2'>
                    <div className={'text-gray-600 hover:text-red-500 transition-colors duration-300'}
                        onClick={()=>{
                            openDeleteRef();
                        }}
                    >
                        <Trash2 size={22} />
                    </div>
                    <div className={'text-gray-600 hover:text-red-500 transition-colors duration-300'}
                        onClick={()=>{
                            const not = !open;
                            setOpen(not);
                        }}
                    >
                        <Menu size={22} />
                    </div>
                </div>
            </div>

            <DialogWrapper
                dialogRef={deleteRef}
                onClose={()=>{
                    closeDeleteRef()
                }}
                className='rounded-lg bg-white shadow-lg text-black border-[1px] border-black space-y-4 p-4'
            >
                <div className='text-lg'>
                    Remove {meta.fName} {meta.lName} as a manager?
                </div>
                <div className='flex justify-end'>
                    <div className='flex justify-between space-x-4'>
                        <div className='rounded-md bg-gray-400 hover:bg-gray-300 transition-colors duration-300 px-3 py-2 cursor-pointer'
                            onClick={()=>{
                                closeDeleteRef()
                            }}
                        >
                            Cancel
                        </div>
                        <div className='rounded-md bg-red-500 hover:bg-red-300 transition-colors duration-300 px-3 py-2 cursor-pointer'
                            onClick={async()=>{
                                const res = await AuthService.deleteUser(meta.userId as string)
                                if(res.success){
                                    closeDeleteRef();
                                }else{
                                    setMessage(res.message)
                                }
                            }}
                        >
                            Remove
                        </div>
                    </div>
                </div>
                {message && (<div className='bg-red-400 rounded-lg outline-2 outline-white -outline-offset=[3px] py-2'>
                    {message}
                </div>)}
            </DialogWrapper>
        </>
    )
}