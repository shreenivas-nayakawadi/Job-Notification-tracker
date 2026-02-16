import { useState, useEffect } from 'react';
import { jobs } from '../data/jobs';
import type { UserPreferences } from '../types/UserPreferences';
import type { DailyDigest } from '../types/DailyDigest';
import { calculateMatchScore } from '../utils/matchScore';
import { Badge } from '../components/Badge';
import './DigestPage.css';

export const DigestPage = () => {
    const [digest, setDigest] = useState<DailyDigest | null>(null);
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const digestKey = `jobTrackerDigest_${today}`;

    useEffect(() => {
        // Load preferences
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }

        // Load today's digest if it exists
        const savedDigest = localStorage.getItem(digestKey);
        if (savedDigest) {
            setDigest(JSON.parse(savedDigest));
        }
    }, [digestKey]);

    const hasPreferences = preferences && (
        preferences.roleKeywords.length > 0 ||
        preferences.preferredLocations.length > 0 ||
        preferences.preferredMode.length > 0 ||
        preferences.experienceLevel !== '' ||
        preferences.skills.length > 0
    );

    const generateDigest = () => {
        if (!preferences) return;

        // Calculate match scores for all jobs
        const jobsWithScores = jobs.map(job => ({
            job,
            matchScore: calculateMatchScore(job, preferences)
        }));

        // Sort by matchScore desc, then postedDaysAgo asc
        const sortedJobs = jobsWithScores.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            }
            return a.job.postedDaysAgo - b.job.postedDaysAgo;
        });

        // Take top 10
        const top10 = sortedJobs.slice(0, 10);

        const newDigest: DailyDigest = {
            date: today,
            entries: top10,
            generatedAt: new Date().toISOString()
        };

        setDigest(newDigest);
        localStorage.setItem(digestKey, JSON.stringify(newDigest));
    };

    const formatDigestAsText = () => {
        if (!digest) return '';

        const formattedDate = new Date(digest.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let text = `TOP 10 JOBS FOR YOU — 9AM DIGEST\n${formattedDate}\n\n`;

        digest.entries.forEach((entry, index) => {
            const { job, matchScore } = entry;
            text += `${index + 1}. ${job.title}\n`;
            text += `   Company: ${job.company}\n`;
            text += `   Location: ${job.location}\n`;
            text += `   Experience: ${job.experience}\n`;
            text += `   Match Score: ${matchScore}%\n`;
            text += `   Apply: ${job.applyUrl}\n\n`;
        });

        text += 'This digest was generated based on your preferences.\n';
        return text;
    };

    const handleCopyToClipboard = async () => {
        const text = formatDigestAsText();
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            alert('Failed to copy to clipboard');
        }
    };

    const handleCreateEmailDraft = () => {
        const text = formatDigestAsText();
        const subject = 'My 9AM Job Digest';
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
        window.location.href = mailtoLink;
    };

    const formattedDate = new Date(today).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (!hasPreferences) {
        return (
            <div className="digest-page">
                <div className="digest-container">
                    <div className="digest-blocking">
                        <h2 className="digest-blocking-title">Set preferences to generate a personalized digest.</h2>
                        <p className="digest-blocking-message">
                            Configure your job preferences in Settings to receive a curated daily digest.
                        </p>
                        <a href="/settings" className="digest-blocking-link">
                            Go to Settings →
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="digest-page">
            <div className="digest-container">
                <div className="digest-header">
                    <h1 className="digest-title">Daily Digest</h1>
                    <p className="digest-subtitle">
                        Your top job matches, curated daily at 9AM.
                    </p>
                    <p className="digest-demo-note">
                        Demo Mode: Daily 9AM trigger simulated manually.
                    </p>
                </div>

                {!digest ? (
                    <div className="digest-generate">
                        <button onClick={generateDigest} className="digest-generate-btn">
                            Generate Today's 9AM Digest (Simulated)
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="digest-card">
                            <div className="digest-card-header">
                                <h2 className="digest-card-title">Top 10 Jobs For You — 9AM Digest</h2>
                                <p className="digest-card-date">{formattedDate}</p>
                            </div>

                            <div className="digest-jobs">
                                {digest.entries.length === 0 ? (
                                    <div className="digest-empty">
                                        <p className="digest-empty-text">
                                            No matching roles today. Check again tomorrow.
                                        </p>
                                    </div>
                                ) : (
                                    digest.entries.map((entry) => {
                                        const { job, matchScore } = entry;
                                        const getScoreVariant = (score: number): 'success' | 'warning' | 'neutral' | 'error' => {
                                            if (score >= 80) return 'success';
                                            if (score >= 60) return 'warning';
                                            if (score >= 40) return 'neutral';
                                            return 'error';
                                        };

                                        return (
                                            <div key={job.id} className="digest-job">
                                                <div className="digest-job-header">
                                                    <div>
                                                        <h3 className="digest-job-title">{job.title}</h3>
                                                        <p className="digest-job-company">{job.company}</p>
                                                    </div>
                                                    <Badge label={`${matchScore}%`} variant={getScoreVariant(matchScore)} />
                                                </div>
                                                <div className="digest-job-details">
                                                    <span>{job.location}</span>
                                                    <span>•</span>
                                                    <span>{job.experience}</span>
                                                </div>
                                                <button
                                                    className="digest-job-apply"
                                                    onClick={() => window.open(job.applyUrl, '_blank')}
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <div className="digest-card-footer">
                                <p className="digest-card-footer-text">
                                    This digest was generated based on your preferences.
                                </p>
                            </div>
                        </div>

                        <div className="digest-actions">
                            <button onClick={handleCopyToClipboard} className="digest-action-btn">
                                {copySuccess ? '✓ Copied!' : 'Copy Digest to Clipboard'}
                            </button>
                            <button onClick={handleCreateEmailDraft} className="digest-action-btn digest-action-btn-secondary">
                                Create Email Draft
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
