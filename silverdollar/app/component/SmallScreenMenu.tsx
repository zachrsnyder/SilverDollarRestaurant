'use client'
import {Menu} from 'lucide-react'
import {useState} from 'react'
import Link from 'next/link'

//TODO: Add slide in effect from right side of screen

const SmallScreenMenu = () => {
    const [showMenu, setShowMenu] = useState<Boolean>(false)

  return (
    <>
    <Menu size={24} onClick={() => setShowMenu(!showMenu)}/>
    {showMenu && (
        <>
        {/* Menu Modal*/}
        <div className='absolute top-14 right-4 flex flex-col bg-white shadow-md w-[100px] rounded-lg z-10'>
            <div className='pl-4 items-center border-t-2 border-gray-400 py-2 hover:text-red-800 text-black'>
                <Link href="/" className="">Home</Link>
            </div>
            <div className='pl-4 items-center border-t-2 border-gray-400 py-2 hover:text-red-800 text-black'>
                <Link href="/menu" className=" ">Menu</Link>
            </div>
            <div className='pl-4 items-center border-t-2 border-gray-400 py-2 hover:text-red-800 text-black'>
                <Link href="/contact" className="">Contact</Link>
            </div>
            <div className='pl-4 items-center border-t-2 border-gray-400 py-2 hover:text-red-800 text-black'>
                <Link href="/employment" className="">Careers</Link>
            </div>
        </div>
        </>
    )}
    </>
  )
}

export default SmallScreenMenu