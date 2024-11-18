"use client";

import { logout } from "../components/logout";
import {useEffect, useState} from 'react'
import { AdminUser } from "@/lib/types/auth";
import LeftDashboard from "./components/LeftDashboard";
import { PageType } from "@/lib/types/pageTypes";
import { ID } from "@/lib/types/ID";


//TODO: Fix switch case to adjust for "add" ID strings

export default function Dashboard() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingContent, setLoadingContent] = useState(true)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [currentPage, setCurrentPage] = useState<PageType>("Welcome");
  const [currentData, setCurrentData] = useState<ID>(null)



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


  //triggers whenever the data is changed, this will force it to change even when moving through two contents of the same page type.
  useEffect(()=>{
    const getContent = async() => {
      setLoadingContent(true)
      switch(currentPage){
        case "Job Postings": {
          try{
            const jobs = await fetch("/api/jobs", {
              method: 'GET',
              headers: { "Content-Type": "application/json" },
            })
            const json = await jobs.json();
            const list = json?.body;
            setCurrentData(list)
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
      }
  
    }

    getContent()
    
  }, [currentData])

  return (
    <div>

      <LeftDashboard setCurrentPage={setCurrentPage} setCurrentData={setCurrentData}/>
      <div className='bg-red-600 hover:bg-red-800 fixed top-5 right-16 z-50 rounded-lg'>
        <button className='my-2 mx-4 text-white' onClick={() => logout()}>Logout</button>
      </div>

      {/* Main Content */}
      <div className='flex jusify-center align-middle mx-auto w-3/4'>
      {/*loading clause wrapped in error clause. Within loading clause is booleans to decide what content to display! Might be smarter to have error nested in loading, but this also works.*/}
      {error ? (<div className='text-lg text-red-500'>{error}</div>) : (<>
        {loadingContent ? (
          <div className='text-7xl'>Loading your content...</div>
        ) : (<>
          {currentPage == "Welcome" && (
            <div className='text-7xl flex-col space-y-16 font-arvo '>
              <div>Welcome,</div>
              <div>{user?.fName}</div>
            </div>
          )}
          {currentPage == "Job Postings" && (
            <div>
              Jobs
            </div>
          )}
          {currentPage == "Manage Workers" && (
            <div>
              Manage Workers Owner!!
            </div>
          )}
        </>)}
      </>)}
      </div>
    </div>
  )
}