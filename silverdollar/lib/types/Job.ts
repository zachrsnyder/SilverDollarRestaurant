
/**
 * @typedef {Object} Job
 * @property {string} id - PK of Job
 * @property {string} title - Job title
 * @property {string} type - full-time, part-time, etc. 
 * @property {string} postedDate - Date the job was posted. Should be handled by entry.
 * @property {string} status - open, closed, etc.
 */

export interface Job {
  id: string
  title: string
  type: string 
  postedDate: string
  status: string 
}