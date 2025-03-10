import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, QuerySnapshot, DocumentData} from 'firebase/firestore';
import { db } from '@/lib/auth/client';
import { JobPostingMetadata } from '../types/JobPostingMetadata';

// Cache for initial data
let cachedPostings: JobPostingMetadata[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function usePostingsSubscription() {
  const [postings, setPostings] = useState<JobPostingMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    // Check if we have valid cached data. Checking if cache has data and if that data has persisted for less than 5 minutes (cache_duration)
    const now = Date.now();
    if (cachedPostings && (now - cacheTimestamp < CACHE_DURATION)) {
      setPostings(cachedPostings);
      setLoading(false);
    }

    const q = query(
      collection(db, 'jobPostings'),
      orderBy('createdAt', 'desc'),
    );

    const handleSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
      if (!cachedPostings) {
        // Initial load - set full data
        const initialPostings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JobPostingMetadata[];
        
        setPostings(initialPostings);
        cachedPostings = initialPostings;
        cacheTimestamp = Date.now();
      } else {
        // Handle incremental updates
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data();
            const newJob: JobPostingMetadata = {
              id: change.doc.id,
              title: data?.title,
              status: data?.status
            };
            
            setPostings(prev => {
              // Avoid duplicates
              const exists = prev.some(post => post.id === newJob.id);
              if (!exists) {
                return [...prev, newJob];
              }
              return prev;
            });
            
            // Update cache
            if (cachedPostings) {
              const exists = cachedPostings.some(post => post.id === newJob.id);
              if (!exists) {
                cachedPostings = [...cachedPostings, newJob];
              }
            }
          }
          
          if (change.type === 'modified') {
            const data = change.doc.data();
            const updatedDoc: JobPostingMetadata = {
              id: change.doc.id,
              title: data?.title,
              status: data?.status
            };
            
            setPostings(prev => 
              prev.map(post => 
                post.id === change.doc.id ? updatedDoc : post
              )
            );
            
            // Update cache
            if (cachedPostings) {
              cachedPostings = cachedPostings.map(post =>
                post.id === change.doc.id ? updatedDoc : post
              );
            }
          }
          
          if (change.type === 'removed') {
            setPostings(prev => 
              prev.filter(post => post.id !== change.doc.id)
            );
            
            // Update cache
            if (cachedPostings) {
              cachedPostings = cachedPostings.filter(
                post => post.id !== change.doc.id
              );
            }
          }
        });
      }
      
      setLoading(false);
    };

    const handleError = (err: Error) => {
      console.error('Error fetching job postings:', err);
      setError(err);
      setLoading(false);
      cachedPostings = null; // Invalidate cache on error
    };

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, handleSnapshot, handleError);

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, []);

  return { postings, loading, error };
}