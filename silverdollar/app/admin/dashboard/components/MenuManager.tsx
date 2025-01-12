'use client'
import { Menu } from '@/lib/types/AdminMenu'
import { getVersionCount, getVersion, changeMetadata, getMenu, addMenu, getAll } from '@/lib/util/editMenuClient'
import { getAlertTitleUtilityClass } from '@mui/material'
import { useEffect, useState } from 'react'
import PDFPreview from './PDFPreview'


interface Props {

    menuData : Menu | null
}
export default function MenuManager({menuData} : Props) {

    return (
        <>
            <div className={`container h-screen min-h-full block`}>
                <div className='container min-h-[70%] min-w-full py-12 flex justify-evenly mt-12 text-xl font-sans'>
                    <div className='block w-[250px] my-12 bg-gray-300 rounded-md '>
                        <div className='text-center'>Breakfast</div>
                        <PDFPreview url={menuData?.breakfastUrl as string}/>
                    </div>
                    <div className='block w-[250px] my-12  bg-gray-300 rounded-md'>
                        <div className='text-center'>Lunch & Dinner</div>
                        <PDFPreview url={menuData?.dinnerUrl as string}/>
                    </div>
                </div>
                <div className='container min-h-[15%] min-w-full flex justify-evenly items-center text-xl text-white font-sans'>
                    <div onClick={()=>{
                        console.log("Change Version")
                    }}
                        className='rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-400 bg-blue-500 py-3 px-5 shadow-md h-full'
                    >
                        Change Version
                    </div>
                    <div onClick={()=>{
                        console.log("Add Menu")
                    }}
                    className='rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-400 bg-blue-500 py-3 px-5 shadow-md h-full'
                    >
                        Add Menu
                    </div>
                </div>                
            </div>
        </>
    )
}