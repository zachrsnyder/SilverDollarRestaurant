"use client";

import { logout } from "../components/logout";
import {useEffect, useState} from 'react'
import { AdminUser } from "@/lib/types/auth";
import LeftDashboard from "./components/LeftDashboard";
import { PageType } from "@/lib/types/pageTypes";
import { ID } from "@/lib/types/ID";
import AddJobForm from "./components/AddJob";
import { usePageData } from "./components/CurrentContext";
import { JobPosting } from "@/lib/types/JobPosting";
import { db } from "@/lib/auth/client";
import { doc, getDoc } from "firebase/firestore";
import ViewPageComp from "./components/ViewPageComp";
import MenuManager from "./components/MenuManager";
import { Menu } from "@/lib/types/AdminMenu";
import { getAll } from "@/lib/util/editMenuClient";


//TODO: Fix switch case to adjust for "add" ID strings
//Plan: 

export default function Dashboard() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingContent, setLoadingContent] = useState(true)
  const [user, setUser] = useState<AdminUser | null>(null)
  const { currentPage, setCurrentPage, currentData, setCurrentData } = usePageData();
  
  //implementing specific pages.
  const [posting, setPosting] = useState<JobPosting | null>(null)
  const [worker, setWorker] = useState(null)
  const [menu, setMenu] = useState<Menu | null>(null);

  async function fetchMenu() {         
    try {
        const value = await getAll();
        if(value.success){
            setMenu(value as Menu)
        }
    } catch (error) {
        console.log("Error fetching menu:", error);
        setMenu(null);
    }
  }

  useEffect(()=>{
    const getSession = async() => {
      try{
        setLoading(true);
        const session = await fetch("/api/admin", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const res = await session.json();
        const body = res.body;
        setUser(body);
        setLoadingContent(false)
      }catch(error : any){
        console.log("Error fetching session: ", error);
        setError(error)
      }finally{
        //at this point, the current users information has been discovered, and the default window to be displayed is the Welcome page, so loading content is no longer true.
        setLoading(false)
      }
    }
    getSession()
    

  }, [])


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
            }
          }
          case "Manage Workers": {
            try{
              if (user?.role != "owner"){
                throw Error("Insufficient Permissions")
              }
              setLoadingContent(false)
            }catch(error : any){
              console.log("Error accessing worker info", error)
              setError("Error accessing worker info")
            }
          }
          case "Manage Menu": {
            await fetchMenu();
            setLoadingContent(false);
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

      <LeftDashboard/>
      <div className='bg-red-800 hover:bg-red-600 fixed top-5 right-16 z-50 rounded-lg'>
        <button className='my-2 mx-4 text-white' onClick={() => logout()}>Logout</button>
      </div>

      {/* Main Content */}
      <div className='flex justify-center items-center mt-20 w-3/4'>
      {/*loading clause wrapped in error clause. Within loading clause is booleans to decide what content to display! Might be smarter to have error nested in loading, but this also works.*/}
      {error ? (<div className='text-lg text-red-500'>{error}</div>) : (<>
        {loadingContent ? (
          <div className='text-7xl'>Loading your content...</div>
        ) : (<>
          {currentPage == "Welcome" && (
            <div className='text-7xl align-middle space-y-16 font-arvo '>
              <div>Welcome,</div>
              <div>{user?.fName}</div>
            </div>
          )}
          {currentPage == "Job Postings" && (
            <>
              {currentData == "add" ? <AddJobForm/> : <ViewPageComp/>}
            </>
          )}
          {currentPage == "Manage Workers" && (
            <>
              {currentData == "add" ? <div>Add a worker</div> : <div>Worker info!</div>}
            </>
          )}
          {currentPage == "Manage Menu" && (
            <>
              <MenuManager menuData={menu}/>
            </>
          )}
        </>)}
      </>)}
      </div>
    </div>
  )
}