'use client'
import Link from "next/link"
import PreviousMap_ from "postcss/lib/previous-map";
import { useState, useEffect } from "react"


interface Props{
        menuUrls: {breakfast: string, dinner: string, error?: number; message?: string;}
}
export default function MenuDropdown({menuUrls} : Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [breakfast, setBreakfast] = useState(false)
    const [dinner, setDinner] = useState(false);

    
    
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
                fontSize: '1.275rem',
                fontWeight: '750',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                className={`${isHovered ? 'text-red-800 ':'text-gray-500' } transition-color duration-300`}
            >
                Menu
            </div>
            <div style={{
                position: 'absolute',
                left: 0,
                width: '12rem',
                backgroundColor: '#ffffff',
                transition: 'all 300ms',
                transform: isHovered ? 'translateY(.1rem)' : 'translateY(-0.5rem)',
                opacity: isHovered ? 1 : 0,
                visibility: isHovered ? 'visible' : 'hidden',
                transformOrigin: 'top',
            }}
                
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
                            fontSize: '1rem',
                            color: breakfast ? '#6b7280' : '#9ca3af',
                            transition: 'color .3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onMouseEnter={(e) => {
                            setBreakfast(true)
                        }}
                        onMouseLeave={(e) => {
                            setBreakfast(false)
                        }}
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
                            fontSize: '1rem',
                            color: dinner ? '#6b7280' : '#9ca3af',
                            transition: 'color .3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        
                        onMouseEnter={(e) => {
                            setDinner(true)
                        }}
                        onMouseLeave={(e) => {
                            setDinner(false)
                        }}
                    >
                        Lunch & Dinner
                    </Link>
                </div>
            </div>
        </div>
    )
}