import type { Job } from '../types/Job';
import { Badge } from './Badge';
import './JobCard.css';

interface JobCardProps {
    job: Job;
    onView: (job: Job) => void;
    onSave: (jobId: string) => void;
    onApply: (url: string) => void;
    isSaved?: boolean;
    matchScore?: number;
}

export const JobCard = ({ job, onView, onSave, onApply, isSaved, matchScore }: JobCardProps) => {
    const formatPostedTime = (days: number) => {
        if (days === 0) return 'Today';
        if (days === 1) return '1 day ago';
        return `${days} days ago`;
    };

    const getScoreVariant = (score: number): 'success' | 'warning' | 'neutral' | 'error' => {
        if (score >= 80) return 'success';
        if (score >= 60) return 'warning';
        if (score >= 40) return 'neutral';
        return 'error';
    };

    return (
        <div className="job-card">
            <div className="job-card-header">
                <div>
                    <h3 className="job-card-title">{job.title}</h3>
                    <p className="job-card-company">{job.company}</p>
                </div>
                <div className="job-card-badges">
                    {matchScore !== undefined && matchScore > 0 && (
                        <Badge label={`${matchScore}%`} variant={getScoreVariant(matchScore)} />
                    )}
                    <Badge label={job.source} variant="neutral" />
                </div>
            </div>

            <div className="job-card-details">
                <span className="job-card-detail">{job.location}</span>
                <span className="job-card-dot">•</span>
                <span className="job-card-detail">{job.mode}</span>
                <span className="job-card-dot">•</span>
                <span className="job-card-detail">{job.experience}</span>
            </div>

            <div className="job-card-salary">{job.salaryRange}</div>

            <div className="job-card-footer">
                <span className="job-card-posted">{formatPostedTime(job.postedDaysAgo)}</span>
                <div className="job-card-actions">
                    <button className="job-card-btn job-card-btn-secondary" onClick={() => onView(job)}>
                        View
                    </button>
                    <button
                        className={`job-card-btn job-card-btn-secondary ${isSaved ? 'job-card-btn-saved' : ''}`}
                        onClick={() => onSave(job.id)}
                    >
                        {isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button className="job-card-btn job-card-btn-primary" onClick={() => onApply(job.applyUrl)}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};
