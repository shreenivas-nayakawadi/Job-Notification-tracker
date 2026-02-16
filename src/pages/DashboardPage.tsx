import { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import type { Job } from '../types/Job';
import { JobCard } from '../components/JobCard';
import { Modal } from '../components/Modal';
import './DashboardPage.css';

export const DashboardPage = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [savedJobs, setSavedJobs] = useState<string[]>(() => {
        const saved = localStorage.getItem('savedJobs');
        return saved ? JSON.parse(saved) : [];
    });

    // Filter states
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [mode, setMode] = useState('');
    const [experience, setExperience] = useState('');
    const [source, setSource] = useState('');
    const [sortBy, setSortBy] = useState('latest');

    const handleView = (job: Job) => {
        setSelectedJob(job);
    };

    const handleSave = (jobId: string) => {
        const newSavedJobs = savedJobs.includes(jobId)
            ? savedJobs.filter(id => id !== jobId)
            : [...savedJobs, jobId];

        setSavedJobs(newSavedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    };

    const handleApply = (url: string) => {
        window.open(url, '_blank');
    };

    // Filter and sort jobs
    const filteredJobs = useMemo(() => {
        let result = jobs.filter(job => {
            const matchesKeyword = !keyword ||
                job.title.toLowerCase().includes(keyword.toLowerCase()) ||
                job.company.toLowerCase().includes(keyword.toLowerCase());
            const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
            const matchesMode = !mode || job.mode === mode;
            const matchesExperience = !experience || job.experience === experience;
            const matchesSource = !source || job.source === source;

            return matchesKeyword && matchesLocation && matchesMode && matchesExperience && matchesSource;
        });

        // Sort
        if (sortBy === 'latest') {
            result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        }

        return result;
    }, [keyword, location, mode, experience, source, sortBy]);

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Job Opportunities</h1>
                <p className="dashboard-subtitle">
                    {filteredJobs.length} jobs available
                </p>
            </div>

            <div className="dashboard-filters">
                <input
                    type="text"
                    placeholder="Search by title or company..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="dashboard-filter-input"
                />

                <select value={location} onChange={(e) => setLocation(e.target.value)} className="dashboard-filter-select">
                    <option value="">All Locations</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="pune">Pune</option>
                    <option value="chennai">Chennai</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="noida">Noida</option>
                    <option value="gurgaon">Gurgaon</option>
                    <option value="remote">Remote</option>
                </select>

                <select value={mode} onChange={(e) => setMode(e.target.value)} className="dashboard-filter-select">
                    <option value="">All Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                </select>

                <select value={experience} onChange={(e) => setExperience(e.target.value)} className="dashboard-filter-select">
                    <option value="">All Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                </select>

                <select value={source} onChange={(e) => setSource(e.target.value)} className="dashboard-filter-select">
                    <option value="">All Sources</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="dashboard-filter-select">
                    <option value="latest">Latest First</option>
                </select>
            </div>

            <div className="dashboard-jobs">
                {filteredJobs.length === 0 ? (
                    <div className="dashboard-empty">
                        <h3 className="dashboard-empty-title">No jobs match your search</h3>
                        <p className="dashboard-empty-message">
                            Try adjusting your filters or search keywords to find more opportunities.
                        </p>
                    </div>
                ) : (
                    filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={handleView}
                            onSave={handleSave}
                            onApply={handleApply}
                            isSaved={savedJobs.includes(job.id)}
                        />
                    ))
                )}
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
