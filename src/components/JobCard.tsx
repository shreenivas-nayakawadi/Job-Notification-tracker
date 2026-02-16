import type { Job } from '../types/Job';
import type { JobStatus } from '../types/JobStatus';
import { Badge } from './Badge';
import './JobCard.css';

interface JobCardProps {
    job: Job;
    onView: (job: Job) => void;
    onSave: (jobId: string) => void;
    onApply: (url: string) => void;
    onStatusChange: (jobId: string, status: JobStatus) => void;
    isSaved?: boolean;
    matchScore?: number;
    status: JobStatus;
}

export const JobCard = ({ job, onView, onSave, onApply, onStatusChange, isSaved, matchScore, status }: JobCardProps) => {
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

    const getStatusVariant = (status: JobStatus): 'success' | 'warning' | 'neutral' | 'error' => {
        if (status === 'Selected') return 'success';
        if (status === 'Applied') return 'warning';
        if (status === 'Rejected') return 'error';
        return 'neutral';
    };

    const statuses: JobStatus[] = ['Not Applied', 'Applied', 'Rejected', 'Selected'];

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

            <div className="job-card-meta">
                <span className="job-card-posted">{formatPostedTime(job.postedDaysAgo)}</span>
                <Badge label={status} variant={getStatusVariant(status)} />
            </div>

            <div className="job-card-status">
                <label className="job-card-status-label">Status:</label>
                <select
                    value={status}
                    onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
                    className="job-card-status-select"
                >
                    {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

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
