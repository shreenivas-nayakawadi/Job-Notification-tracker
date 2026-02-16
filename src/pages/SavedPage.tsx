import { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import type { Job } from '../types/Job';
import { JobCard } from '../components/JobCard';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/EmptyState';
import { Bookmark } from 'lucide-react';
import '../pages/DashboardPage.css';

export const SavedPage = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [savedJobs, setSavedJobs] = useState<string[]>(() => {
        const saved = localStorage.getItem('savedJobs');
        return saved ? JSON.parse(saved) : [];
    });

    const handleView = (job: Job) => {
        setSelectedJob(job);
    };

    const handleSave = (jobId: string) => {
        const newSavedJobs = savedJobs.filter(id => id !== jobId);
        setSavedJobs(newSavedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    };

    const handleApply = (url: string) => {
        window.open(url, '_blank');
    };

    const savedJobsList = useMemo(() => {
        return jobs.filter(job => savedJobs.includes(job.id));
    }, [savedJobs]);

    if (savedJobsList.length === 0) {
        return (
            <EmptyState
                icon={<Bookmark size={48} />}
                title="No saved jobs yet"
                message="Jobs you save will appear here for easy access later."
            />
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Saved Jobs</h1>
                <p className="dashboard-subtitle">
                    {savedJobsList.length} {savedJobsList.length === 1 ? 'job' : 'jobs'} saved
                </p>
            </div>

            <div className="dashboard-jobs">
                {savedJobsList.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onView={handleView}
                        onSave={handleSave}
                        onApply={handleApply}
                        isSaved={true}
                    />
                ))}
            </div>

            <Modal isOpen={!!selectedJob} onClose={() => setSelectedJob(null)}>
                {selectedJob && (
                    <div className="job-modal">
                        <h2 className="job-modal-title">{selectedJob.title}</h2>
                        <p className="job-modal-company">{selectedJob.company}</p>

                        <div className="job-modal-details">
                            <span>{selectedJob.location}</span>
                            <span>•</span>
                            <span>{selectedJob.mode}</span>
                            <span>•</span>
                            <span>{selectedJob.experience}</span>
                        </div>

                        <div className="job-modal-salary">{selectedJob.salaryRange}</div>

                        <div className="job-modal-section">
                            <h3 className="job-modal-section-title">Description</h3>
                            <p className="job-modal-description">{selectedJob.description}</p>
                        </div>

                        <div className="job-modal-section">
                            <h3 className="job-modal-section-title">Required Skills</h3>
                            <div className="job-modal-skills">
                                {selectedJob.skills.map((skill, index) => (
                                    <span key={index} className="job-modal-skill">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <button
                            className="job-modal-apply-btn"
                            onClick={() => handleApply(selectedJob.applyUrl)}
                        >
                            Apply Now
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};
