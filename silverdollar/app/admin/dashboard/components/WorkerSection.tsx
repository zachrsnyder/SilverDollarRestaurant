import { ChangeEvent, useRef, useState } from "react";
import { usePageData } from "./CurrentContext";
import { Plus, UsersRound } from "lucide-react";
import Tooltip from "@/lib/util/Tooltip";
import { useWorkersSubscription } from "@/lib/util/useWorkersSubscription";
import { WorkerMeta } from "./WorkerMeta";
import DialogWrapper from "@/lib/util/DialogWrapper";
import { AdminUser, fieldSchemas, formSchema, WorkerData } from "@/lib/types/auth";
import { z } from "zod";



export default function WorkerSection() {
    const [isOpen, setIsOpen] = useState(false);
    const {workers, loading} = useWorkersSubscription();

    const [newWorker, setNewWorker] = useState<WorkerData>({
        fName: '',
        lName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState<{
        fName?: string;
        lName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({})

    const addWorkerDialog = useRef<HTMLDialogElement>(null)
    const openAddDialog = () => {
        document.body.style.overflow = 'hidden';
        addWorkerDialog.current?.showModal();
    }
    const closeAddDialog = () => {
        document.body.style.overflow = "unset";
        addWorkerDialog.current?.close()
    }

    const validateField = (field: keyof WorkerData, value: string) => {
        try {
          if (field === 'confirmPassword') {
            // For confirm password, we need to validate both passwords
            formSchema.parse({ ...newWorker, [field]: value });
          } else {
            // For other fields, we can validate just that field
            fieldSchemas[field].parse(value);
          }
          setErrors(prev => ({ ...prev, [field]: undefined }));
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldError = error.errors.find(err => 
              err.path.includes(field)
            )?.message;
            setErrors(prev => ({ ...prev, [field]: fieldError }));
          }
        }
      };

    const handleChange = (field: keyof WorkerData) => (e : ChangeEvent<HTMLInputElement>): void => {
        const { name, value, type, checked } = e.target;
        setNewWorker((prev : WorkerData) => {
            if(!prev) return prev;
            return {
                ...prev,
                [name]: value
            }
        })
        validateField(field, value)
    }
    return(
        <>
        <div className='flex flex-col relative'>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
                setIsOpen(!isOpen);
            }}
            >
            <div className="p-2 rounded-lg bg-white/5 text-black group-hover:bg-white/10 transition-colors">
                <UsersRound className="" size={20} />
            </div>
            <h3 className="text-lg font-sans font-bold ">Manage Workers</h3>
            </div>
            <Tooltip text={'Add Worker'} coords={[-14,10]}>
            <button 
            onClick={() => {
                openAddDialog();
            }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors group z-30"
            >
                <Plus className="text-black/70 group-hover: transition-colors" size={20} />
            </button>
            </Tooltip>
        </div>
        <div>
            {isOpen && (
                <div className="p-4 space-y-1 flex flex-col">
                    {loading ? (
                    <div className="text-black/70 text-center py-4">Loading...</div>
                    ) : (
                    <>
                    {workers.map(worker => (
                        <div key={worker.userId}>
                        <WorkerMeta meta={worker}/>
                        </div>
                    ))}
                    </>
                    )}
            </div>
            )}
        </div>
  </div>
    <DialogWrapper
        dialogRef={addWorkerDialog}
        onClose={()=>{
            closeAddDialog();
        }}
        className='rounded-lg bg-white text-black space-y-4'
    >
        <div className='font-sans font-bold text-lg'>
            Add Manager
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label className="block text-sm font-medium text-gray-600">First Name</label>
                <input
                type="text"
                name="fName"
                value={newWorker.fName}
                onChange={handleChange("fName")}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600">Last Name</label>
                <input
                type="text"
                name="lName"
                value={newWorker.lName}
                onChange={handleChange("lName")}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                type="text"
                name="email"
                value={newWorker.email}
                onChange={handleChange("email")}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                />
            </div>
        </div>
        <div className='space-y-4'>
            <div>
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input
                type="text"
                name="password"
                value={newWorker.password}
                onChange={handleChange("password")}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600">Re-Type Password</label>
                <input
                type="text"
                name="confirmPassword"
                value={newWorker.confirmPassword}
                onChange={handleChange("confirmPassword")}
                className="mt-1 block w-full text-black bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                />
            </div>
        </div>
    </DialogWrapper>

  </>
)};
