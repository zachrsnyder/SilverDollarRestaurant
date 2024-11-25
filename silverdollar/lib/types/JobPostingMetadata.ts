import {ID} from './ID'
export type JobStatus = "Active" | "Archived" | "Draft";

export interface JobPostingMetadata {
    id: ID
    title: string
    status: JobStatus
}