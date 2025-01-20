import { useEffect, useRef } from "react"

interface Props {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>

    message: string

    rgba: string
}


const PillNotification = ({isOpen, setIsOpen, message, rgba} : Props) => {


    
    // ts being silly need to specify that these methods will be here
    const popoverRef = useRef<HTMLDivElement & {
        showPopover: ()=>void;
        hidePopover: ()=>void;
    }>(null)

    useEffect(()=>{
        if(isOpen == true){
            popoverRef.current?.showPopover();
            let time = 2
            const timer = setInterval(()=> {
                --time;
                if(time == 0){
                    clearInterval(timer);
                    setIsOpen(false)
                    popoverRef.current?.hidePopover();
                }
            }, 1000)
        }
    }, [isOpen])
  
    return (
        <div
            popover='auto'
            ref={popoverRef}
            style={{
                backgroundColor: `${rgba}`, // bg-green-400
                position: 'fixed',
                borderRadius: '2rem',    // rounded-3xl
                height: '3rem',            // h-20
                padding: '1rem',        
                outline: '2px solid white',
                outlineOffset: '-4px',
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                visibility: `${isOpen == true ? 'visible' : 'hidden'}`,
                overflow: 'hidden'
            }} 
        >
            {message} 
        </div>
    )
}

export default PillNotification