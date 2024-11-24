
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import {useState, useEffect} from 'react'
import { db } from '../auth/client';
import { JobPostingMetadata } from '../types/JobPostingMetadata';
/**
 * customn useState to allow real time state management of postings as they are entered (by anyone anywhere!) 
 */
export const usePostingsSubscription = () => {
    const [postings, setPostings] = useState<Array<JobPostingMetadata>>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Create query for job postings
      const q = query(
        collection(db, 'jobPostings'),
        orderBy('createdAt', 'desc')
      );
  
      // real time listener. Returns unsubscribe function isnt that brilliant
      const unsubscribe = onSnapshot(q, (snapshot   ) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            // A new job posting was added
            console.log('New posting:', change.doc.data());
            const data = change.doc.data();
            const newJob = {
              id: change.doc.id,
              title: data?.title,
              status: data?.status
            }
            setPostings(prev => [...prev, newJob]);
          }
          if (change.type === 'modified') {
            // An existing posting was modified
  
            //had to decompose data because typescript was being silly.
            const data = change.doc.data();
            const updatedDoc = {
              id: change.doc.id,
              title: data?.title,
              status: data?.status
            }
            console.log('Modified posting:', change.doc.data());
            setPostings(prev => 
              prev.map(post => 
                post.id === change.doc.id 
                  ? updatedDoc
                  : post
              )
            );
          }
          if (change.type === 'removed') {
            // A posting was deleted
            console.log('Removed posting:', change.doc.id);
            setPostings(prev => prev.filter(post => post.id !== change.doc.id));
          }
        });
        
        setLoading(false);
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);
  
    return { postings, loading };
  };