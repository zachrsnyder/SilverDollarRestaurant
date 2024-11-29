import { ID } from "./ID";
import { JobType } from "./JobPosting";
import { JobStatus } from "./JobPostingMetadata";

export interface ClientJobPostingMeta {
    id: ID,
    title: string,
    status: JobStatus,
    type: JobType,
}