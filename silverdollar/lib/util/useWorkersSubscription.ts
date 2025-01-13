import { useEffect, useState } from "react";
import { AdminUser } from "../types/auth";
import { collection, orderBy, query, where } from "@firebase/firestore";
import { db } from "../auth/client";


let cachedWorkers: AdminUser[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export function useWorkersSubscription() {
    const [workers, setWorkers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    //use effect occurs on mount, and grabs all users and subscribes to that collection
    useEffect(()=>{
        setLoading(true);

        const now = Date.now();
        if (cachedWorkers && (now - cacheTimestamp < CACHE_DURATION)) {
            setWorkers(cachedWorkers);
            setLoading(false);
        }
        
            const q = query(
              collection(db, 'users'),
              where("role", "==", "manager")
            );
    },[])

}