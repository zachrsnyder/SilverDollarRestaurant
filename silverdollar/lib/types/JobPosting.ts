import { ID } from './ID';
import { JobStatus } from './JobPostingMetadata';
import { Timestamp } from 'firebase/firestore';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'temporary'
export type JobPeriod = 'hourly' | 'yearly'

export interface CreateJobPosting {
  title: string;
  type: JobType;
  summary: string;
  keyResponsibilities: string[];
  requirements: string[];
  compensation: {
    min: number;
    max: number;
    period: JobPeriod;
  };
  status: JobStatus;
}

export interface JobPosting {
  id: ID,
  title: string;
  type: JobType
  summary: string;
  keyResponsibilities: string[];
  requirements: string[];
  compensation: {
    min: number;
    max: number;
    period: JobPeriod;
  };
  status: JobStatus;

  applications: number,

  createdAt: Timestamp;

  updatedAt: Timestamp;

}

export const areJobPostingsEqual = (job1: JobPosting | null, job2: JobPosting | null): boolean => {
  // Handle null cases
  if (job1 === null && job2 === null) return true;
  if (job1 === null || job2 === null) return false;

  // Compare primitive fields
  if (job1.id !== job2.id) return false;
  if (job1.title !== job2.title) return false;
  if (job1.type !== job2.type) return false;
  if (job1.summary !== job2.summary) return false;
  if (job1.status !== job2.status) return false;
  if (job1.applications !== job2.applications) return false;


  // Compare arrays
  if (!areArraysEqual(job1.keyResponsibilities, job2.keyResponsibilities)) return false;
  if (!areArraysEqual(job1.requirements, job2.requirements)) return false;

  // Compare compensation object
  if (!areCompensationEqual(job1.compensation, job2.compensation)) return false;



  // Compare timestamps
  if (!areTimestampsEqual(job1.createdAt, job2.createdAt)) return false;
  if (!areTimestampsEqual(job1.updatedAt, job2.updatedAt)) return false;


  return true;
};

// Helper functions
const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
};

const areCompensationEqual = (
  comp1: JobPosting['compensation'], 
  comp2: JobPosting['compensation']
): boolean => {
  return (
    comp1.min === comp2.min &&
    comp1.max === comp2.max &&
    comp1.period === comp2.period
  );
};

const areTimestampsEqual = (ts1: Timestamp, ts2: Timestamp): boolean => {
  return ts1.seconds === ts2.seconds && ts1.nanoseconds === ts2.nanoseconds;
};

export default areJobPostingsEqual;