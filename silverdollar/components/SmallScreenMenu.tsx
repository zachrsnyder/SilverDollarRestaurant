'use client'
import {Menu} from 'lucide-react'
import {useState, useEffect, useCallback, useRef} from 'react'
import Link from 'next/link'

//TODO: Add slide in effect from right side of screen

interface Props{
    menuUrls: {breakfast: string, dinner: string, error?: number; message?: string;}
}

const SmallScreenMenu = ({menuUrls} : Props) => {
    const [showMenu, setShowMenu] = useState<Boolean>(false)
    const modalRef = useRef<HTMLElement>(null)

    const handleClickOutside = useCallback(
        (event: MouseEvent | TouchEvent) => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
          ) {
            setShowMenu(false)
          }
        },
        [setShowMenu]
      );

    useEffect(() => {
        if(showMenu){
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [showMenu, handleClickOutside])
  return (
    <>
    <div 
        className='relative'
        ref={modalRef as React.LegacyRef<HTMLDivElement>}
    >
        <Menu size={24} onClick={() => setShowMenu(!showMenu)}/>
        <div style={{
            position: 'absolute',
            left: -200,
            top: 40,
            width: '16rem',
            backgroundColor: '#ffffff',
            transition: 'all 300ms',
            transform: showMenu ? 'translateX(0)' : 'translateX(1rem)',
            visibility: showMenu ? 'visible' : 'hidden',
            opacity: showMenu ? 1 : 0,
            transformOrigin: 'left',
            paddingLeft: '2rem',
        }}>
            <div
                className='pt-[.5rem]'
            >
                <Link
                    href='/'
                    className='block pt-2 pb-4 font-medium border-b-2 border-b-gray-600 text-md text-gray-400 hover:text-gray-500'
                >
                    Home
                </Link>
                <div className='block pt-2 pb-4 font-medium text-sm border-b-2 border-b-gray-600'
                    style={{
                        paddingLeft: '.5rem'
                    }}
                >
                    <Link
                        href={menuUrls.breakfast}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className='text-gray-400 hover:text-gray-500 block pb-4'
                    >Breakfast Menu</Link>
                    <Link 
                        href={menuUrls.dinner}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className='text-gray-400 hover:text-gray-500 block'
                    >Lunch & Dinner Menu</Link>
                </div>
                <Link
                    href='/careers'
                    className='block pt-2 pb-4 font-medium text-gray-400 hover:text-gray-500 border-b-2 border-b-gray-600'
                >
                    Careers
                </Link>

            </div>
        </div>
    </div>
    </>
  )
}

export default SmallScreenMenu