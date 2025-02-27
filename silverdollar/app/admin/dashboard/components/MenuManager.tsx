'use client'
import { Menu } from '@/lib/types/AdminMenu'
import { changeMetadata, getMenu, addMenu } from '@/lib/util/editMenuClient'
import { useRef, useState } from 'react'
import PDFPreview from './PDFPreview'
import DialogWrapper from '@/lib/util/DialogWrapper'
import { Save, Undo } from 'lucide-react'
import Tooltip from '@/lib/util/Tooltip'
import PDFInput from './PDFInput'


interface Props {

    menuData : Menu | null

    setMenuData : React.Dispatch<Menu | null>

    currentMenu : Menu | null

    setCurrentMenu : React.Dispatch<Menu | null>
}

export default function MenuManager({menuData, setMenuData, currentMenu, setCurrentMenu} : Props) {

    const versionDialog = useRef<HTMLDialogElement>(null)
    const addDialog = useRef<HTMLDialogElement>(null)
    const [saveable, setSaveable] = useState<boolean>(false)
    const [dinnerFile, setDinnerFile]= useState<File | null>(null)
    const [dinnerUrl, setDinnerUrl] = useState<string | null>(null)
    const [breakfastFile, setBreakfastFile]= useState<File | null>(null)
    const [breakfastUrl, setBreakfastUrl] = useState<string | null>(null)
    const [addError, setAddError] = useState<boolean>(false)
    const [versionError, setVersionError] = useState<boolean>(false)
    
    const setOfficialMenu = async() => {
        const updatedMenu = { 
            breakfastUrl: currentMenu?.breakfastUrl,
            dinnerUrl: currentMenu?.dinnerUrl,
            version: currentMenu?.version,
            versionCount: currentMenu?.versionCount
        }
        console.log(updatedMenu)
        setMenuData(updatedMenu)
        const res = await changeMetadata(updatedMenu);
        console.log(menuData)
        setSaveable(false)
    }

    const handleAddDialogClose = () => {
        setAddError(false)
        setDinnerFile(null)
        setBreakfastFile(null)
        setBreakfastUrl(null)
        setDinnerUrl(null)
        document.body.style.overflow = 'unset';
        addDialog.current?.close()
    }

    const handleVersionDialogClose = () => {
        setVersionError(false)
        document.body.style.overflow = 'unset';
        versionDialog.current?.close()
    }
    
    //everytime the user looks at a new version of the menu, they will be given the option to save that version as the perminant version of the menu that would be reflected on the user side.
    
    const handleMenuAddSubmit = async() => {
        if(dinnerFile != null && breakfastFile != null){
            const res = await addMenu(breakfastFile, dinnerFile);
            if(res.success){
                setMenuData({
                    ...menuData,
                    versionCount: menuData?.versionCount ? menuData?.versionCount + 1 : 0 
                })
                setCurrentMenu({
                    ...currentMenu,
                    versionCount: menuData?.versionCount ? menuData?.versionCount + 1 : 0 
                })
                console.log(menuData);
            }else{
                setAddError(true)
            }
        }
    }

    return (
        <>
            <div className={`container h-screen min-h-[120vh] block`}>
                <div className='container py-3 text-xl font-arvo pl-5'> Version: {currentMenu?.version}</div>
                <div className='container min-h-[50%] min-w-full py-12 flex justify-evenly mt-12 text-xl font-sans'>
                    <div className='my-auto bg-gray-300 rounded-md border-black border-[1px]'>
                        <div className='text-center rounded-md bg-gray-200 py-2 mb-2'>Breakfast</div>
                        <PDFPreview url={currentMenu?.breakfastUrl as string} width={250} height={350}/>
                    </div>
                    <div className='my-auto bg-gray-300 rounded-md border-black border-[1px]'>
                        <div className='text-center rounded-md bg-gray-200 py-2 mb-2'>Lunch & Dinner</div>
                        <PDFPreview url={currentMenu?.dinnerUrl as string} width={250} height={0}/>
                    </div>
                </div>
                <div className='container min-h-[15%] min-w-full flex justify-evenly items-center text-xl text-white font-sans'>
                    <div className='flex items-center space-x-4'>
                        <div onClick={()=>{
                            document.body.style.overflow = 'hidden';
                            versionDialog.current?.showModal();
                        }}
                            className='rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-400 bg-blue-500 py-3 px-5 shadow-md h-full'
                        >
                            View Versions
                        </div>
                        <div className={`${saveable ? '' : 'hidden'}`}
                            onClick={async()=>{
                                await setOfficialMenu();
                            }}
                        >
                            <Tooltip
                                text={"Save as menu"}
                                coords={[-25,-90]}
                            >
                                <Save size={28} className={'text-gray-600 hover:text-blue-500'}/>
                            </Tooltip>
                        </div>
                        <div className={`${saveable ? '' : 'hidden'}`}
                            onClick={()=>{
                                const updatedMenu = {
                                    breakfastUrl: menuData?.breakfastUrl,
                                    dinnerUrl: menuData?.dinnerUrl,
                                    version: menuData?.version,
                                    versionCount: currentMenu?.versionCount
                                }
                                setCurrentMenu(updatedMenu)
                                setSaveable(false)
                            }}
                        >
                            <Tooltip
                                text={"Revert to current menu."}
                                coords={[-25,-90]}
                            >
                                <Undo size={28} className={'text-gray-600 hover:text-red-500'}/>
                            </Tooltip>
                        </div>
                    </div>
                    
                    <div onClick={()=>{
                        document.body.style.overflow = 'hidden';
                        addDialog.current?.showModal();
                    }}
                    className='rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-400 bg-blue-500 py-3 px-5 shadow-md h-full'
                    >
                        Add Menues
                    </div>
                </div>                
            </div>
            {/* version change dialog */}
            <DialogWrapper
                dialogRef={versionDialog}
                onClose={()=>{
                    handleVersionDialogClose();
                }}
                className={'rounded-lg bg-white shadow-lg text-black'}
                onFocusMiss={()=>{
                    handleVersionDialogClose();
                }}
            >
                <div className='w-[400px] min-h-[400px] p-4 space-y-4'>
                    <div className='text-lg font-sans font-semibold'>View Menu Version</div>
                    <div className='bg-gray-100 border border-gray-200 rounded-md overflow-hidden'>
                        {Array(menuData?.versionCount ? menuData?.versionCount + 1 : 0).fill(0).map((value, index) => {
                            if(index > 0 && index != currentMenu?.version){
                            return (
                            <div key={index} className='p-3 hover:bg-gray-200 cursor-pointer border-b border-gray-200 last:border-b-0'
                            onClick={async()=>{
                                const newMenu = await getMenu(index);
                                console.log(newMenu)
                                console.log(index)
                                if(newMenu.success){
                                    // Create the updated menu first
                                    const updated: Menu = {
                                        breakfastUrl: newMenu.breakfast,
                                        dinnerUrl: newMenu.dinner,
                                        version: index,
                                        versionCount: currentMenu?.versionCount ?? 0
                                    };
                                    // Then pass it directly to setCurrentMenu
                                    setCurrentMenu(updated);

                                    console.log(currentMenu)
                                    handleVersionDialogClose();
                                }
                                setSaveable(true)
                            }}
                            >
                                Version {index}
                            </div>
                        )}})}
                    </div>
                    {versionError && (
                    <div className='bg-red-400 rounded-lg px-3 py-5 text-center'
                        style={{
                            outline: '2px solid white',
                            outlineOffset: '-6px'
                        }}
                    >
                        Failed to change version.
                    </div>
                    )}
                </div>
            </DialogWrapper>

            {/* add menu dialog */}
            <DialogWrapper
                dialogRef={addDialog}
                onClose={()=>{
                    handleAddDialogClose();
                }}
                className={'rounded-lg bg-white shadow-lg text-black'}
            >
                <div className='w-[600px] min-h-[400px] p-4 space-y-4 block'>
                    <div className='text-lg font-sans font-semibold'>Add New Menus</div>
                    <div className='flex justify-evenly min-h-[400px]'>
                        <PDFInput id={1} selectedFile={breakfastFile} setSelectedFile={setBreakfastFile} previewUrl={breakfastUrl} setPreviewUrl={setBreakfastUrl}/>
                        <PDFInput id={2} selectedFile={dinnerFile} setSelectedFile={setDinnerFile} previewUrl={dinnerUrl} setPreviewUrl={setDinnerUrl}/>
                    </div>
                    <div className='flex text-white justify-evenly'>
                        <div onClick={()=>{
                            handleAddDialogClose();
                        }}
                        className='rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-400 bg-blue-500 py-3 px-5 shadow-md h-full'
                        >
                            Cancel
                        </div>
                        <div onClick={()=>{
                            handleMenuAddSubmit()
                            handleAddDialogClose();
                        }}
                        className='rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-400 bg-blue-500 py-3 px-5 shadow-md h-full'
                        >
                            Add Menu
                        </div>
                    </div>
                    {addError && (
                    <div className='bg-red-400 rounded-lg px-3 py-5 text-center'
                        style={{
                            outline: '2px solid white',
                            outlineOffset: '-6px'
                        }}
                    >
                        Failed to add menues.
                    </div>
                    )}
                </div>
            </DialogWrapper>
        </>
    )
}