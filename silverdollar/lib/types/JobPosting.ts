import { ID } from './ID';
import { JobStatus } from './JobPostingMetadata';
import { Timestamp } from 'firebase/firestore';


export interface CreateJobPosting {
  title: string;
  type: 'full-time' | 'part-time' | 'contract' | 'temporary';
  summary: string;
  keyResponsibilities: string[];
  requirements: string[];
  compensation: {
    min: number;
    max: number;
    period: 'hourly' | 'yearly';
  };
  status: JobStatus;
}

export interface JobPosting {
  id: ID,
  title: string;
  type: 'full-time' | 'part-time' | 'contract' | 'temporary';
  summary: string;
  keyResponsibilities: string[];
  requirements: string[];
  compensation: {
    min: number;
    max: number;
    period: 'hourly' | 'yearly';
  };
  status: JobStatus;

  applications: number,

  createdAt: Timestamp;

  updatedAt: Timestamp;

}