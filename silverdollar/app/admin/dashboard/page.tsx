"use client";

import {useEffect, useState} from 'react'
import LeftDashboard from "./components/LeftDashboard";
import AddJobForm from "./components/AddJob";
import { usePageData } from "./components/CurrentContext";
import { JobPosting } from "@/lib/types/JobPosting";
import { db } from "@/lib/auth/client";
import { doc, getDoc } from "firebase/firestore";
import ViewPageComp from "./components/ViewPageComp";
import MenuManager from "./components/MenuManager";
import { Menu } from "@/lib/types/AdminMenu";
import { getAll } from "@/lib/util/editMenuClient";
import { useAuth } from "../components/AuthProvider";
import { AuthService } from "@/lib/auth/auth";



//TODO: Fix switch case to adjust for "add" ID strings
//Plan: 

export default function Dashboard() {
  const [error, setError] = useState<string | null>(null)
  const [loadingContent, setLoadingContent] = useState(true)
  const { user, loading, claims } = useAuth()
  const { currentPage, setCurrentPage, currentData, setCurrentData } = usePageData();
  //implementing specific pages.
  const [posting, setPosting] = useState<JobPosting | null>(null)
  const [worker, setWorker] = useState(null)
  const [menu, setMenu] = useState<Menu | null>(null);
  const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);

  async function fetchMenu() {   
       
    try {
        const value = await getAll();
        console.log(value)
        if(value.success){
            setMenu(value as Menu)
            setCurrentMenu(value as Menu);
        }else{
          console.log("Indescribable error occurred")
        }
    } catch (error) {
        console.log("Error fetching menu:", error);
        setMenu(null);
    }
  }

  
  
  //triggers whenever the data is changed, this will force it to change even when moving through two contents of the same page type. (unless miraculously a worker and a job listing have the same id)
  useEffect(()=>{
    const getContent = async() => {
      setLoadingContent(true)
      if(currentData != "add"){
        switch(currentPage){
          case "Job Postings": {
            try{
              const docRef = doc(db, "jobPostings", `${currentData}`);
              const data = await getDoc(docRef);
              
            }catch(error : any){
              console.log("Error fetching job postings", error);
              setError("Error fetching job postings")
            }finally{
              setLoadingContent(false)
              break;
            }
          }
          case "Manage Workers": {
            try{
              if (claims.role != "admin"){
                throw Error("Insufficient Permissions")
              }
              setLoadingContent(false)
            }catch(error : any){
              console.log("Error accessing worker info", error)
              setError("Error accessing worker info")
            }
            break;
          }
          case "Manage Menu": {
            await fetchMenu();
            setLoadingContent(false);
            break;
          }
        }
      }else{
        setLoadingContent(false);
      }
    }

    getContent()
    
  }, [currentData])

  return (
    <div className='flex flex-row justify-between align-middle'>

      <LeftDashboard user={claims}/>
      <div className='bg-red-800 hover:bg-red-600 transition-colors duration-300 fixed top-5 right-16 z-50 rounded-lg'>
        <button className='my-2 mx-4 text-white' onClick={async() => {
          await AuthService.logout()
        }}>Logout</button>
      </div>

      {/* Main Content */}
      <div className='flex justify-center items-center mt-20 w-3/4'>
      {/*loading clause wrapped in error clause. Within loading clause is booleans to decide what content to display! Might be smarter to have error nested in loading, but this also works.*/}
      {error ? (<div className='text-lg text-red-500'>{error}</div>) : (<>
        {loading ? (
          <div className='text-7xl'>Loading your content...</div>
        ) : (<>
          {currentPage == "Welcome" && (
            <div className='text-7xl align-middle space-y-16 font-arvo '>
              <div>Welcome,</div>
              <div>{claims?.fName}</div>
            </div>
          )}
          {currentPage == "Job Postings" && (
            <>
              {currentData == "add" ? <AddJobForm/> : <ViewPageComp/>}
            </>
          )}
          {currentPage == "Manage Menu" && (
            <>
              <MenuManager menuData={menu} setMenuData={setMenu} currentMenu={currentMenu} setCurrentMenu={setCurrentMenu}/>
            </>
          )}
        </>)}
      </>)}
      </div>
    </div>
  )
}