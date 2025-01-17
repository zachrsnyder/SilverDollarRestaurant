import { useEffect, useRef } from "react"

interface Props {
    values: {isOpen: boolean, colorTailwind: string, message: string}

    setValues: React.Dispatch<React.SetStateAction<{isOpen: boolean, colorTailwind: string, message: string}>>
}


const PillNotification = ({values, setValues} : Props) => {


    
    // ts being silly need to specify that these methods will be here
    const popoverRef = useRef<HTMLDivElement & {
        showPopover: ()=>void;
        hidePopover: ()=>void;
    }>(null)

    useEffect(()=>{
        if(values.isOpen == true){
            popoverRef.current?.showPopover();
            let time = 2
            const timer = setInterval(()=> {
                --time;
                if(time == 0){
                    clearInterval(timer);
                    setValues({
                        ...values,
                        isOpen: false
                        
                    })
                    popoverRef.current?.hidePopover();
                }
            }, 1000)

        } else {
            popoverRef.current?.hidePopover();
        }
    }, [values])
  
    return (
        <div
            popover='auto'
            ref={popoverRef}
            style={{
                backgroundColor: `${values.colorTailwind}`, // bg-green-400
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
                visibility: `${values.isOpen == true ? 'visible' : 'hidden'}`,
                overflow: 'hidden'
            }} 
        >
            {values.message} 
        </div>
    )
}

export default PillNotification