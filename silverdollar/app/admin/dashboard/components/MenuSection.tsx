import { ScrollText } from "lucide-react"
import { usePageData } from "./CurrentContext"



export default function MenuSection() {
    const {currentPage, setCurrentPage, currentData, setCurrentData} = usePageData()
    return(
<div className='flex flex-col relative'
    onClick={()=>{setCurrentPage("Manage Menu"); setCurrentData("Menu")}}
>
  <div className="flex items-center justify-between p-4 border-b border-white/10">
    <div 
      className="flex items-center space-x-3 cursor-pointer group"
    >
      <div className="p-2 rounded-lg bg-white/5 text-black group-hover:bg-white/10 transition-colors">
        <ScrollText className="" size={20} />
      </div>
      <h3 className="text-sm md:text-lg font-sans font-bold ">Menu Management</h3>
    </div>
  </div>
</div>
)
}