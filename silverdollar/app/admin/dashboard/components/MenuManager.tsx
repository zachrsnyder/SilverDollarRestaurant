import { Menu } from '@/lib/types/AdminMenu'
import { getVersionCount, getVersion, changeMetadata, getMenu, addMenu, getAll } from '@/lib/util/editMenuClient'
import { getAlertTitleUtilityClass } from '@mui/material'
import { useEffect, useState } from 'react'

export default function MenuManager() {

    const [menu, setMenu] = useState<Menu | null>()

    useEffect(() => {
        async function fetchMenu() {
            try {
                const value = await getAll();
                if(value.success){
                    setMenu(value as Menu)
                }
            } catch (error) {
                console.error("Error fetching menu:", error);
                setMenu(null);
            }
        }
        fetchMenu();
    }, []);
    return (
        <>
            <div>
                
            </div>
        </>
    )
}