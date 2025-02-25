'use server'

import RandomGallery from "./RandomGallery"
import Image from "next/image"


export default async function RandGallWrapper() {
    return (
        <div className='bg-slate-400 relative'>
        <div className=' flex justify-center items-center min-w-full'
            style={{
                maxHeight: '1000px',
                padding: '5rem 0 ',
            }}
        >
            <RandomGallery/>
        </div>
        <Image
            src='/images/Wood_Horizontal.jpeg'
            alt='Wood backdrop'
            fill
            priority
        />
        </div>
    )
}