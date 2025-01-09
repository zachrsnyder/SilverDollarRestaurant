'use client'

import { Utensils, CookingPot } from 'lucide-react'

const MenuesSection = () => {
  return (
    <div className="grid min-h-[500px]" style={{ 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))'
    }}>
        <div className=""
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
        </div>
        <div className="h-[500px]"
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
        </div>
    </div>
  )
}

export default MenuesSection