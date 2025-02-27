import Link from 'next/link'
import Image from 'next/image'
import SmallScreenMenu from '@/components/SmallScreenMenu'
import { getMenu } from '@/lib/util/getMenu'

const NavBar = async() => {
  const menuUrls = await getMenu();
  
  // shadow-[0px_5px_10px_rgba(0,0,0,.5)]
  return (
    <nav className="bg-white p-4 flex fixed w-full z-40 justify-center shadow-2xl h-[90px]">
      <div className="flex flex-1 justify-between sm:justify-center items-center space-x-10 text-xl font-arvo font-bold text-gray-500">
        <div className="sm:hidden">
          <Link href="#" className="block">
            <Image 
            src='/images/logo.png' 
            alt='Silver Dollar' 
            width={100} 
            height={50} 
            className='w-full h-auto'
            priority
            />
          </Link>
        </div>
        <div className="hidden sm:flex space-x-1 sm:space-x-2 md:space-x-8 lg:space-x-12 xl:space-x-24 2xl:space-x-32">
          <div style={{
                padding: '1.5rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
                }}
                className='og-header-text transition-colors duration-300'
            >
              <Link
                href='/'
              >
                Home
              </Link>
            </div>
            <div style={{
                padding: '1.5rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                className='og-header-text transition-colors duration-300'
            >
              <Link
                href='/careers'
              >
                Careers
              </Link>
            </div>
            {/* Flex shrink because this logo shrinks when I tell it too! */}
            <div className="flex-shrink-0 flex justify-center">
            <Link href="#" className="flex justify-center">
                <Image 
                src='/images/logo.png' 
                alt='Silver Dollar' 
                width={300} 
                height={210} 
                className='w-full transition-all duration-300 my-auto pt-[1.8rem]'
                priority
                />
            </Link>
            </div>
            <div style={{
                padding: '1.5rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                className='og-header-text transition-colors duration-300'
            >
              <Link
                href={menuUrls.breakfast}
                className='flex align-middle flex-col items-center'
                prefetch
                target='_blank'
              >
                <div>
                Breakfast
                </div>
                <div>
                Menu
                </div>
              </Link>
            </div>
            <div style={{
                padding: '1.5rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                className='og-header-text transition-colors duration-300'
            >
              <Link
                href={menuUrls.dinner}
                className='flex align-middle flex-col items-center'
                prefetch
                target='_blank'
              >
                <div>
                Dinner
                </div>
                <div>
                Menu
                </div>
              </Link>
            </div>
          </div>
          <div className='flex justify-end w-full sm:hidden'>
            <SmallScreenMenu menuUrls={menuUrls}/>
          </div>
      </div>
    </nav>
  )
}

export default NavBar