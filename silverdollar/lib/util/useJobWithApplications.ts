import { useState, useEffect, useRef } from 'react';
import { doc, collection, query, orderBy, onSnapshot, FirestoreError } from 'firebase/firestore';
import { db } from '@/lib/auth/client';
import { JobPosting } from '../types/JobPosting';
import { ID } from '../types/ID';


// temp application interface to simulate cache and query
interface Application {
  id: string;
  name: string;
  email: string;
  
}

// Cache manager outside component to persist between renders
const jobCache = new Map<string, JobPosting>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheEntry {
  data: JobPosting;
  timestamp: number;
}


// class to contain all of the jobs that have been accessed. Contains them in a dictionary with ID as the key
class JobCache {
  private cache = new Map<ID, CacheEntry>();

  set(jobId: ID, data: JobPosting) {
    this.cache.set(jobId, {
      data,
      timestamp: Date.now()
    });
  }

  get(jobId: ID): JobPosting | null {
    const entry = this.cache.get(jobId);
    if (!entry) return null;

    // Check if cache is still valid
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      this.cache.delete(jobId);
      return null;
    }

    return entry.data;
  }

  clear() {
    this.cache.clear();
  }
}

const globalJobCache = new JobCache();

export function useJobWithApplications(jobId: ID) {
  const [job, setJob] = useState<JobPosting | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Refs to track subscriptions
  const jobUnsubscribeRef = useRef<(() => void) | null>(null);
  const applicationsUnsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!jobId) return;

    // Check cache first
    const cachedJob = globalJobCache.get(jobId);
    if (cachedJob) {
      setJob(cachedJob);
      setLoading(false);
    }

    // Set up job document listener
    const jobRef = doc(db, 'jobPostings', jobId);
    jobUnsubscribeRef.current = onSnapshot(
      jobRef,
      (docSnap) => {
        if (docSnap.exists()) {  
            const jobData = {
                id: docSnap.id,
                ...docSnap.data()
            } as JobPosting;
            setJob(jobData);
            // Update cache
            globalJobCache.set(jobId, jobData);
            setLoading(false);
        } else {
          setJob(null);
          setLoading(false);
        }
      },
      (error: FirestoreError) => {
        console.error('Error fetching job:', error);
        setError(error as Error);
        setLoading(false);
      }
    );
    // Set up applications listener
    const applicationsRef = collection(db, 'jobPostings', jobId, 'applications');
    const applicationsQuery = query(applicationsRef, orderBy('submittedAt', 'desc'));
    
    applicationsUnsubscribeRef.current = onSnapshot(
    applicationsQuery,
    (querySnapshot) => {
        const apps = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        })) as Application[];
        setApplications(apps);
    },
    (error) => {
        console.error('Error fetching applications:', error);
        setError(error as Error);
    }
    );
    
    

    // Cleanup function
    return () => {
      if (jobUnsubscribeRef.current) {
        jobUnsubscribeRef.current();
      }
      if (applicationsUnsubscribeRef.current) {
        applicationsUnsubscribeRef.current();
      }
    };
  }, [jobId]);

  // Function to force refresh the data
  const refreshData = async () => {
    setLoading(true);
    // Clear cache for this job
    globalJobCache.clear();
    
    // Resubscribe to listeners
    if (jobUnsubscribeRef.current) {
      jobUnsubscribeRef.current();
    }
    if (applicationsUnsubscribeRef.current) {
      applicationsUnsubscribeRef.current();
    }
    
    // The effect will re-run and fetch fresh data
  };

  return { 
    job, 
    applications, 
    loading, 
    error,
    refreshData
  };
}