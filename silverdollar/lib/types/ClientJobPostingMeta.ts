import { ID } from "./ID";
import { JobType } from "./JobPosting";
import { JobStatus } from "./JobPostingMetadata";

export interface ClientJobPosting {
    id: ID,
    title: string,
    status: JobStatus,
    type: JobType,
    compensation: {
        max: number,
        min: number,
        period: string
    },
    createdAt: string,
    keyResponsibilities: string[],
    requirements: string[],
    summary: string,
    updatedAt: string,
}





    