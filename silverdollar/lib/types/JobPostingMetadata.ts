import {ID} from './ID'
type JobStatus = "Active" | "Archived";

export interface JobPostingMetadata {
    id: ID
    title: string
    status: JobStatus
}