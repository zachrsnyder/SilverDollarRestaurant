import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import SmallScreenMenu from '@/component/SmallScreenMenu'

//TODO: Add alternative styling for smaller screens!


const NavBar = () => {
  
  return (
    <nav className="bg-primary p-4 shadow-[0px_5px_10px_rgba(0,0,0,.5)] flex fixed w-full z-40 h-20">
      <div className="flex flex-1 justify-start items-center space-x-14 text-xl font-arvo font-bold text-gray-500">
          <Link href="#" className="text-black font-bold" ><Image src='/images/logo.png' alt='Silver Dollar' width={125} height={65} className='min-w-[125px]'/></Link>
          <div className="hidden sm:flex space-x-14">
            <Link href="/" className='hover:text-red-800'>Home</Link>
            <Link href="/menu" className='hover:text-red-800'>Menu</Link>
            <Link href="/contact" className='hover:text-red-800'>Contact</Link>
            <Link href="/careers" className='hover:text-red-800'>Careers</Link>
          </div>
          <div className='flex justify-end w-full sm:hidden'>
            <SmallScreenMenu/>
          </div>
      </div>
    </nav>
  )
}

export default NavBar