import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import SmallScreenMenu from '@/component/SmallScreenMenu'
import MenuDropdown from '@/component/MenuDropdown'

//TODO: Add alternative styling for smaller screens!


const NavBar = () => {
  
  return (
    <nav className="bg-primary p-4 shadow-[0px_5px_10px_rgba(0,0,0,.5)] flex fixed w-full z-40 h-20">
      <div className="flex flex-1 justify-start items-center space-x-14 text-xl font-arvo font-bold text-gray-500">
          <Link href="#" className="text-black font-bold" ><Image src='/images/logo.png' alt='Silver Dollar' width={125} height={65} className='min-w-[125px]'/></Link>
          <div className="hidden sm:flex space-x-14">
          <div style={{
                padding: '1.5rem 1rem',
                fontSize: '1.275rem',
                fontWeight: '750',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                className='text-gray-500'
            >
              <Link
                href='/'
              >
                Home
              </Link>
            </div>
            <MenuDropdown/>
            <div style={{
                padding: '1.5rem 1rem',
                fontSize: '1.275rem',
                fontWeight: '750',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                className='text-gray-500'
            >
              <Link
                href='/careers'
              >
                Careers
              </Link>
            </div>
          </div>
          <div className='flex justify-end w-full sm:hidden'>
            <SmallScreenMenu/>
          </div>
      </div>
    </nav>
  )
}

export default NavBar