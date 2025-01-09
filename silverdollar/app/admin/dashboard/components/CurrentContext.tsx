'use client'
import { ID } from "@/lib/types/ID";
import { PageType } from "@/lib/types/pageTypes";
import { createContext, useContext, useState } from "react";


interface CurrentContextType {
    currentPage: PageType;
    setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
    currentData: ID;
    setCurrentData: React.Dispatch<React.SetStateAction<ID>>;
  }


const PageDataContext = createContext<CurrentContextType | null>(null);

export const usePageData = () => {
  const context = useContext(PageDataContext);
  if (!context) {
    throw new Error("usePageData must be used within a PageDataProvider");
  }
  return context;
};

export const CurrentContext = ({ children } : any) => {
  // State for the current page
  const [currentPage, setCurrentPage] = useState<PageType>("Welcome");

  // State for the current data
  const [currentData, setCurrentData] = useState<ID>(null);

  const value = {
    currentPage,
    setCurrentPage,
    currentData,
    setCurrentData,
  };

  return (
    <PageDataContext.Provider value={value}>
      {children}
    </PageDataContext.Provider>
  );
};