import Link from 'next/link'
import Image from 'next/image'
import SmallScreenMenu from '@/components/SmallScreenMenu'
import { getMenu } from '@/lib/util/getMenu'

const NavBarAdmin = async() => {
  const menuUrls = await getMenu();
  
  // shadow-[0px_5px_10px_rgba(0,0,0,.5)]
  return (
    <nav className="bg-white p-4 flex fixed w-full z-40 justify-center shadow-2xl h-[90px]">
      <div className="flex flex-1 justify-between items-center space-x-10 text-xl font-arvo font-bold text-gray-500">
        <div className='flex justify-start'>
        <div className="pt-[.8rem]">
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
        <div className="hidden sm:flex space-x-1 sm:space-x-2 md:space-x-8">
          <div style={{
                padding: '1.5rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
                }}
                className='admin-header-text transition-colors duration-300'
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
                className='admin-header-text transition-colors duration-300'
            >
              <Link
                href='/careers'
              >
                Careers
              </Link>
            </div>
            {/* Flex shrink because this logo shrinks when I tell it too! */}
            <div style={{
                padding: '1.5rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                className='admin-header-text transition-colors duration-300'
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
                className='admin-header-text transition-colors duration-300'
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
          </div>
          <div className='flex justify-end w-full sm:hidden'>
            <SmallScreenMenu menuUrls={menuUrls}/>
          </div>
      </div>
    </nav>
  )
}

export default NavBarAdmin