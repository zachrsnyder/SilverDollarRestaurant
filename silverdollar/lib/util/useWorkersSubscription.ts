import { useEffect, useState } from "react";
import { AdminUser } from "../types/auth";
import { collection, DocumentData, onSnapshot, query, QuerySnapshot, where } from "@firebase/firestore";
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

        //check if cache is valid
        const now = Date.now();
        if (cachedWorkers && (now - cacheTimestamp < CACHE_DURATION)) {
            setWorkers(cachedWorkers);
            setLoading(false);
        }
        
        const q = query(
            collection(db, 'users'),
            where("role", "==", "manager")
        );

        const handleSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
            if(!cachedWorkers){
                //initial load

                const initialWorkers = snapshot.docs.map(doc => (
                    {
                        userId: doc.id,
                        ...doc.data()
                })) as AdminUser[];

                setWorkers(initialWorkers);
                cachedWorkers = initialWorkers;
                cacheTimestamp = Date.now()
            }else{
                snapshot.docChanges().forEach((changedDoc)=> {
                    if( changedDoc.type === "added") {
                        const data = changedDoc.doc.data();
                        const newWorker: AdminUser = {
                            userId: changedDoc.doc.id,
                            role: data?.role,
                            fName: data?.fName,
                            lName: data?.lName,
                            email: data?.email,
                            createdAt: data?.createdAt
                        }

                        //checks if worker is already in the workers array and if not adds it to that array.
                        setWorkers((prev : AdminUser[]) => {
                            const exists = prev.some((worker : AdminUser) => worker.userId === newWorker.userId);
                            if(!exists) {
                                return [...prev, newWorker];
                            }
                            return prev
                        })

                        // update cache under the same criteria
                        if(cachedWorkers){
                            const exists = cachedWorkers.some((worker : AdminUser) => worker.userId === newWorker.userId);
                            if(!exists) {
                                return [...cachedWorkers, newWorker];
                            }
                        }
                    }
                    if (changedDoc.type === "modified") {
                        const data = changedDoc.doc.data();
                        const updatedWorker: AdminUser = {
                            userId: changedDoc.doc.id,
                            role: data?.role,
                            fName: data?.fName,
                            lName: data?.lName,
                            email: data?.email,
                            createdAt: data?.createdAt
                        }

                        setWorkers((prev : AdminUser[]) => 
                            prev.map(worker => 
                                worker.userId === changedDoc.doc.id ? updatedWorker : worker
                            )
                        );

                        if( cachedWorkers ) {
                            cachedWorkers = cachedWorkers.map(worker => 
                                worker.userId === changedDoc.doc.id ? updatedWorker : worker
                            )
                        }
                    }

                    if(changedDoc.type === 'removed') {
                        setWorkers((prev : AdminUser[]) => 
                            prev.filter(worker => worker.userId !== changedDoc.doc.id)
                        )

                        if (cachedWorkers) {
                            cachedWorkers = cachedWorkers.filter(
                                worker => worker.userId !== changedDoc.doc.id
                            )
                        }
                    }
                })
            }

            setLoading(false);
        }

        const handleError = (err: Error) => {
            console.error('Error fetching workers data:', err);
            setError(err);
            setLoading(false);
            cachedWorkers = null;
        }

        const unsubscribe = onSnapshot(q, handleSnapshot, handleError);
        
        // Cleanup
        return () => {
            unsubscribe();
        };
    },[])

    return { workers, loading, error }
}