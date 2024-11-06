import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

//TODO: Add alternative styling for smaller screens!


const NavBar = () => {
  
  return (
    <nav className="bg-primary p-4 shadow-[0px_5px_10px_rgba(0,0,0,.5)] flex fixed w-full z-10 h-20">
      <div className="flex flex-1 justify-start items-center space-x-14">
          <Link href="#" className="text-black text-xl font-bold" ><Image src='/images/logo.png' alt='Silver Dollar' width={125} height={65}/></Link>
          <Link href="/" className="text-black hover:text-white">Home</Link>
          <Link href="/menu" className="text-black hover:text-white">Menu</Link>
          <Link href="/contact" className="text-black hover:text-white">Contact</Link>
          <Link href="/employment" className="text-black hover:text-white">Employment</Link>
      </div>
    </nav>
  )
}

export default NavBar