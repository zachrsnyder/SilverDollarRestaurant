import { useState } from 'react';
import { JobStatus } from './JobPostingMetadata';
import {z} from 'zod'


export interface JobPosting {
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