import { useState, useMemo, useEffect } from 'react';
import { jobs } from '../data/jobs';
import type { Job } from '../types/Job';
import type { UserPreferences } from '../types/UserPreferences';
import { JobCard } from '../components/JobCard';
import { Modal } from '../components/Modal';
import { calculateMatchScore } from '../utils/matchScore';
import './DashboardPage.css';

export const DashboardPage = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [savedJobs, setSavedJobs] = useState<string[]>(() => {
        const saved = localStorage.getItem('savedJobs');
        return saved ? JSON.parse(saved) : [];
    });

    const [preferences, setPreferences] = useState<UserPreferences | null>(null);

    // Filter states
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [mode, setMode] = useState('');
    const [experience, setExperience] = useState('');
    const [source, setSource] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);

    useEffect(() => {
        // Load preferences from localStorage
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            setPreferences(JSON.parse(saved));
        }
    }, []);

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

    // Calculate match scores and filter/sort jobs
    const jobsWithScores = useMemo(() => {
        return jobs.map(job => ({
            job,
            matchScore: calculateMatchScore(job, preferences)
        }));
    }, [preferences]);

    const filteredJobs = useMemo(() => {
        let result = jobsWithScores.filter(({ job, matchScore }) => {
            // Basic filters (AND logic)
            const matchesKeyword = !keyword ||
                job.title.toLowerCase().includes(keyword.toLowerCase()) ||
                job.company.toLowerCase().includes(keyword.toLowerCase());
            const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
            const matchesMode = !mode || job.mode === mode;
            const matchesExperience = !experience || job.experience === experience;
            const matchesSource = !source || job.source === source;

            // Match threshold filter
            const meetsThreshold = !showOnlyMatches ||
                (preferences && matchScore >= preferences.minMatchScore);

            return matchesKeyword && matchesLocation && matchesMode &&
                matchesExperience && matchesSource && meetsThreshold;
        });

        // Sort
        if (sortBy === 'latest') {
            result.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
        } else if (sortBy === 'matchScore') {
            result.sort((a, b) => b.matchScore - a.matchScore);
        } else if (sortBy === 'salary') {
            // Simple salary sort - extract first number from salary range
            result.sort((a, b) => {
                const getSalaryValue = (salaryRange: string) => {
                    const match = salaryRange.match(/(\d+)/);
                    return match ? parseInt(match[1]) : 0;
                };
                return getSalaryValue(b.job.salaryRange) - getSalaryValue(a.job.salaryRange);
            });
        }

        return result;
    }, [jobsWithScores, keyword, location, mode, experience, source, sortBy, showOnlyMatches, preferences]);

    const hasPreferences = preferences && (
        preferences.roleKeywords.length > 0 ||
        preferences.preferredLocations.length > 0 ||
        preferences.preferredMode.length > 0 ||
        preferences.experienceLevel !== '' ||
        preferences.skills.length > 0
    );

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Job Opportunities</h1>
                <p className="dashboard-subtitle">
                    {filteredJobs.length} jobs available
                </p>
            </div>

            {!hasPreferences && (
                <div className="dashboard-banner">
                    <p className="dashboard-banner-text">
                        ⚠️ Set your preferences to activate intelligent matching.
                    </p>
                    <a href="/settings" className="dashboard-banner-link">
                        Go to Settings →
                    </a>
                </div>
            )}

            <div className="dashboard-controls">
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
                        <option value="latest">Sort: Latest</option>
                        <option value="matchScore">Sort: Match Score</option>
                        <option value="salary">Sort: Salary</option>
                    </select>
                </div>

                {hasPreferences && (
                    <label className="dashboard-toggle">
                        <input
                            type="checkbox"
                            checked={showOnlyMatches}
                            onChange={(e) => setShowOnlyMatches(e.target.checked)}
                            className="dashboard-toggle-input"
                        />
                        <span className="dashboard-toggle-label">
                            Show only jobs above my threshold ({preferences?.minMatchScore}%)
                        </span>
                    </label>
                )}
            </div>

            <div className="dashboard-jobs">
                {filteredJobs.length === 0 ? (
                    <div className="dashboard-empty">
                        <h3 className="dashboard-empty-title">
                            {showOnlyMatches
                                ? 'No roles match your criteria'
                                : 'No jobs match your search'}
                        </h3>
                        <p className="dashboard-empty-message">
                            {showOnlyMatches
                                ? 'Try adjusting your filters or lowering your match threshold in settings.'
                                : 'Try adjusting your filters or search keywords to find more opportunities.'}
                        </p>
                    </div>
                ) : (
                    filteredJobs.map(({ job, matchScore }) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={handleView}
                            onSave={handleSave}
                            onApply={handleApply}
                            isSaved={savedJobs.includes(job.id)}
                            matchScore={matchScore}
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
