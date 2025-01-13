import { useState } from "react";
import { usePageData } from "./CurrentContext";
import { Plus, UsersRound } from "lucide-react";
import Tooltip from "@/lib/util/Tooltip";


export default function WorkerSection() {
    const [isOpen, setIsOpen] = useState(false);
    const {workers, loading} = useWorkersSubscription();
    const {currentPage, setCurrentPage, currentData, setCurrentData} = usePageData()
    return(
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
        setCurrentData("add")
        setCurrentPage("Manage Workers")
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
                <div key={worker.id}>
                  <WorkerMeta meta={worker}/>
                </div>
              ))}
            </>
            )}
      </div>
      )}
  </div>
  </div>
)};
