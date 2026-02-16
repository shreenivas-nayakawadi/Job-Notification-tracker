export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

export interface StatusChange {
    jobId: string;
    jobTitle: string;
    company: string;
    status: JobStatus;
    changedAt: string;
}
