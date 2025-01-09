'use server '

import RandomGallery from "./RandomGallery"


export default function RandGallWrapper() {
    return (
        <div className='bg-gray-100 flex justify-center items-center min-w-[100vw]'
            style={{
                maxHeight: '1000px',
                padding: '5rem 0 ',
                background: 'linear-gradient(45deg, #f9f9f9 25%, transparent 25%, transparent 75%, #f9f9f9 75%)',
                backgroundSize: '12px 12px',
            }}
        >
            <RandomGallery/>
        </div>
    )
}