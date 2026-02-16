import type { Job } from './Job';

export interface DigestEntry {
    job: Job;
    matchScore: number;
}

export interface DailyDigest {
    date: string;
    entries: DigestEntry[];
    generatedAt: string;
}
