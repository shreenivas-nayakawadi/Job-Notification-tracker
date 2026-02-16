import { useState, useEffect } from 'react';
import { CheckCircle, Circle, ExternalLink, Copy } from 'lucide-react';
import './ProofPage.css';

interface StepStatus {
    step: number;
    title: string;
    completed: boolean;
}

export const ProofPage = () => {
    const [lovableLink, setLovableLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [deployedLink, setDeployedLink] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    const steps: StepStatus[] = [
        { step: 1, title: 'Setup Design System', completed: true },
        { step: 2, title: 'Route Skeleton', completed: true },
        { step: 3, title: 'Problem Statement + App Skeleton', completed: true },
        { step: 4, title: 'Market Research + Realistic Data Engine', completed: true },
        { step: 5, title: 'Architecture + Preferences + Matching Engine', completed: true },
        { step: 6, title: 'HLD + Daily Digest Engine + 9AM Simulation', completed: true },
        { step: 7, title: 'LLD + Status Tracking + Notification Templates', completed: true },
        { step: 8, title: 'Test & Debug + Built-in Verification Layer', completed: true },
    ];

    useEffect(() => {
        // Load links from localStorage
        const savedLovable = localStorage.getItem('jobTrackerLovableLink');
        const savedGithub = localStorage.getItem('jobTrackerGithubLink');
        const savedDeployed = localStorage.getItem('jobTrackerDeployedLink');

        if (savedLovable) setLovableLink(savedLovable);
        if (savedGithub) setGithubLink(savedGithub);
        if (savedDeployed) setDeployedLink(savedDeployed);
    }, []);

    const isValidUrl = (url: string): boolean => {
        if (!url) return true; // Allow empty
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleLovableSave = () => {
        if (isValidUrl(lovableLink)) {
            localStorage.setItem('jobTrackerLovableLink', lovableLink);
        }
    };

    const handleGithubSave = () => {
        if (isValidUrl(githubLink)) {
            localStorage.setItem('jobTrackerGithubLink', githubLink);
        }
    };

    const handleDeployedSave = () => {
        if (isValidUrl(deployedLink)) {
            localStorage.setItem('jobTrackerDeployedLink', deployedLink);
        }
    };

    const handleCopySubmission = async () => {
        const submission = `------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${lovableLink || '[Not provided]'}

GitHub Repository:
${githubLink || '[Not provided]'}

Live Deployment:
${deployedLink || '[Not provided]'}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------`;

        try {
            await navigator.clipboard.writeText(submission);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            alert('Failed to copy to clipboard');
        }
    };

    // Check if all tests passed
    const allTestsPassed = (() => {
        const saved = localStorage.getItem('jobTrackerTestChecklist');
        if (saved) {
            const checkedItems = JSON.parse(saved);
            return checkedItems.length === 10;
        }
        return false;
    })();

    const allLinksProvided = lovableLink && githubLink && deployedLink;
    const isShipped = allLinksProvided && allTestsPassed;

    const getStatus = (): 'Not Started' | 'In Progress' | 'Shipped' => {
        if (isShipped) return 'Shipped';
        if (lovableLink || githubLink || deployedLink) return 'In Progress';
        return 'Not Started';
    };

    const status = getStatus();

    return (
        <div className="proof-page">
            <div className="proof-container">
                <div className="proof-header">
                    <h1 className="proof-title">Project 1 — Job Notification Tracker</h1>
                    <div className={`proof-status proof-status-${status.toLowerCase().replace(' ', '-')}`}>
                        {status}
                    </div>
                </div>

                {/* Step Completion Summary */}
                <div className="proof-section">
                    <h2 className="proof-section-title">Step Completion Summary</h2>
                    <div className="proof-steps">
                        {steps.map((step) => (
                            <div key={step.step} className="proof-step">
                                {step.completed ? (
                                    <CheckCircle size={20} className="proof-step-icon proof-step-completed" />
                                ) : (
                                    <Circle size={20} className="proof-step-icon proof-step-pending" />
                                )}
                                <span className="proof-step-number">Step {step.step}:</span>
                                <span className="proof-step-title">{step.title}</span>
                                <span className={`proof-step-status ${step.completed ? 'proof-step-status-completed' : 'proof-step-status-pending'}`}>
                                    {step.completed ? 'Completed' : 'Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Artifact Collection */}
                <div className="proof-section">
                    <h2 className="proof-section-title">Artifact Collection</h2>

                    <div className="proof-input-group">
                        <label className="proof-label">
                            Lovable Project Link
                            <span className="proof-label-required">*</span>
                        </label>
                        <div className="proof-input-row">
                            <input
                                type="url"
                                value={lovableLink}
                                onChange={(e) => setLovableLink(e.target.value)}
                                onBlur={handleLovableSave}
                                placeholder="https://lovable.app/projects/..."
                                className={`proof-input ${lovableLink && !isValidUrl(lovableLink) ? 'proof-input-error' : ''}`}
                            />
                            {lovableLink && isValidUrl(lovableLink) && (
                                <a href={lovableLink} target="_blank" rel="noopener noreferrer" className="proof-external-link">
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </div>
                        {lovableLink && !isValidUrl(lovableLink) && (
                            <span className="proof-error-text">Invalid URL format</span>
                        )}
                    </div>

                    <div className="proof-input-group">
                        <label className="proof-label">
                            GitHub Repository Link
                            <span className="proof-label-required">*</span>
                        </label>
                        <div className="proof-input-row">
                            <input
                                type="url"
                                value={githubLink}
                                onChange={(e) => setGithubLink(e.target.value)}
                                onBlur={handleGithubSave}
                                placeholder="https://github.com/username/repo"
                                className={`proof-input ${githubLink && !isValidUrl(githubLink) ? 'proof-input-error' : ''}`}
                            />
                            {githubLink && isValidUrl(githubLink) && (
                                <a href={githubLink} target="_blank" rel="noopener noreferrer" className="proof-external-link">
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </div>
                        {githubLink && !isValidUrl(githubLink) && (
                            <span className="proof-error-text">Invalid URL format</span>
                        )}
                    </div>

                    <div className="proof-input-group">
                        <label className="proof-label">
                            Deployed URL (Vercel)
                            <span className="proof-label-required">*</span>
                        </label>
                        <div className="proof-input-row">
                            <input
                                type="url"
                                value={deployedLink}
                                onChange={(e) => setDeployedLink(e.target.value)}
                                onBlur={handleDeployedSave}
                                placeholder="https://your-project.vercel.app"
                                className={`proof-input ${deployedLink && !isValidUrl(deployedLink) ? 'proof-input-error' : ''}`}
                            />
                            {deployedLink && isValidUrl(deployedLink) && (
                                <a href={deployedLink} target="_blank" rel="noopener noreferrer" className="proof-external-link">
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </div>
                        {deployedLink && !isValidUrl(deployedLink) && (
                            <span className="proof-error-text">Invalid URL format</span>
                        )}
                    </div>
                </div>

                {/* Copy Submission */}
                <div className="proof-section">
                    <button onClick={handleCopySubmission} className="proof-copy-btn">
                        <Copy size={16} />
                        {copySuccess ? 'Copied!' : 'Copy Final Submission'}
                    </button>
                </div>

                {/* Ship Status */}
                {isShipped && (
                    <div className="proof-shipped">
                        <p className="proof-shipped-message">Project 1 Shipped Successfully.</p>
                    </div>
                )}

                {!isShipped && allLinksProvided && !allTestsPassed && (
                    <div className="proof-warning">
                        <p>Complete all 10 test verification items to ship.</p>
                    </div>
                )}

                {!isShipped && !allLinksProvided && (
                    <div className="proof-warning">
                        <p>Provide all 3 required links to ship.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
