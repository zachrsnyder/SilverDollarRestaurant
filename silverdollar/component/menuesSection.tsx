'use client'

import { Utensils, CookingPot } from 'lucide-react'
import { LegacyRef, useEffect, useRef, useState } from 'react'

interface Props{
    menuUrls: {breakfast: string, dinner: string, error?: number; message?: string;}
}

const MenuesSection = ({menuUrls} : Props) => {

    const [visible, setVisible] = useState<boolean>(false)
    const gridRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect(); // Stop observing once visible
            }
          },
          {
            threshold: 0.1 // Trigger when 10% of the element is visible
          }
        );
    
        if (gridRef.current) {
          observer.observe(gridRef.current);
        }
    
        return () => observer.disconnect();
      }, []);

  return (
    <div className="grid min-h-[500px]" 
        ref={gridRef as LegacyRef<HTMLDivElement>}
        style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            opacity: `${visible ? '1' : '0'}`,
            transition: 'opacity',
            transitionDuration: '1500ms',
            transitionTimingFunction: 'cubic-bezier(0, 0, 0.3, 1)'
        }}
    >
        <a className=""
            href={menuUrls.breakfast}
            target="_blank" 
            rel="noopener noreferrer"
            style={{
                backgroundImage: `url('/images/IMG_3469.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '500px',
                position: 'relative',
                zIndex: 1
            }}
        >
            <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full text-white uppercase font-arvo font-bold text-9xl text-wrap'
                style={{
                    zIndex: 10,
                    backgroundColor: 'rgba(20,20,20,.2)',
                    textTransform: 'capitalize',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(20,20,20,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(20,20,20,0.2)';
                  }}
            >
                <div className='text-center'>
                    <Utensils className='mx-auto mb-4 font-bold' size={52}/>
                    <h4 className='text-white font-arvo font-bold text-4xl md:text-6xl lg:text-7xl max-w-[80%] mx-auto break-words'>check out our breakfast menu!</h4>
                </div>
            </div>  
        </a>
        <a className="h-[500px]"
            href={menuUrls.dinner}
            target="_blank" 
            rel="noopener noreferrer"
            style={{
                backgroundImage: `url('/images/IMG_3517.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '500px',
                position: 'relative',
                zIndex: 1
            }}
        >
            <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full text-white uppercase font-arvo font-bold text-9xl text-wrap'
                style={{
                    zIndex: 10,
                    backgroundColor: 'rgba(20,20,20,.2)',
                    textTransform: 'capitalize',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(20,20,20,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(20,20,20,0.2)';
                  }}
            >
                <div className='text-center'>
                    <CookingPot className='mx-auto mb-4 font-bold' size={52}/>
                    <h4 className='text-white font-arvo font-bold text-4xl md:text-6xl lg:text-7xl max-w-[80%] mx-auto break-words'>check out our dinner menu!</h4>
                </div>
                
            </div>
        </a>
    </div>
  )
}

export default MenuesSection