import { ID } from "./ID";
import { JobType } from "./JobPosting";
import { JobStatus } from "./JobPostingMetadata";
import { Timestamp } from "firebase/firestore";

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
    createdAt: Timestamp,
    keyResponsibilities: string[],
    requirements: string[],
    summary: string,
    updatedAt: Timestamp,
}





    