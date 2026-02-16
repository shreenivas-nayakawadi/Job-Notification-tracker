export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    mode: 'Remote' | 'Hybrid' | 'Onsite';
    experience: 'Fresher' | '0-1' | '1-3' | '3-5';
    skills: string[];
    source: 'LinkedIn' | 'Naukri' | 'Indeed';
    postedDaysAgo: number;
    salaryRange: string;
    applyUrl: string;
    description: string;
}
