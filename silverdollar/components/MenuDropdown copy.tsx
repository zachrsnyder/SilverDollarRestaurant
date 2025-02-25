'use client'
import Link from "next/link"
import PreviousMap_ from "postcss/lib/previous-map";
import { useState, useEffect } from "react"


interface Props{
        menuUrls: {breakfast: string, dinner: string, error?: number; message?: string;}
}
export default function MenuDropdown({menuUrls} : Props) {
    const [isHovered, setIsHovered] = useState(false);

    
    
    return (
        <div 
            style={{
                position: 'relative',
                display: 'inline-block'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{
                
                padding: '1.5rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                className={`text-gray-600 hover:text-red-800 transition-color duration-200`}
            >
                Menu
            </div>
            <div style={{
                position: 'absolute',
                left: 0,
                width: '12rem',
                transition: 'all 300ms',
                transform: isHovered ? 'translateY(.1rem)' : 'translateY(-0.5rem)',
                opacity: isHovered ? 1 : 0,
                visibility: isHovered ? 'visible' : 'hidden',
                transformOrigin: 'top',
            }}
                className='bg-white'
            >
                <div style={{ padding: '0.5rem 0' }} role="menu"
                >
                    <Link
                        href={menuUrls.breakfast}
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            display: 'block',
                            padding: '0.5rem 1rem',
                        }}
                        prefetch
                        className='text-gray-600 hover:text-red-800 transition-color duration-200'
                    >
                        Breakfast
                    </Link>
                    <Link
                        href={menuUrls.dinner}
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            display: 'block',
                            padding: '0.5rem 1rem',
                        }}
                        prefetch
                        className='text-gray-600 hover:text-red-800 transition-color duration-200'
                    >
                        Lunch & Dinner
                    </Link>
                </div>
            </div>
        </div>
    )
}