import { useState, useEffect } from 'react';
import { Input } from '../components/Input';
import type { UserPreferences } from '../types/UserPreferences';
import './SettingsPage.css';

const LOCATION_OPTIONS = [
    'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai',
    'Noida', 'Gurgaon', 'Remote'
];

export const SettingsPage = () => {
    const [preferences, setPreferences] = useState<UserPreferences>({
        roleKeywords: [],
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: '',
        skills: [],
        minMatchScore: 40
    });

    const [roleKeywordsInput, setRoleKeywordsInput] = useState('');
    const [skillsInput, setSkillsInput] = useState('');

    useEffect(() => {
        // Load preferences from localStorage on mount
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            const loadedPrefs = JSON.parse(saved);
            setPreferences(loadedPrefs);
            setRoleKeywordsInput(loadedPrefs.roleKeywords.join(', '));
            setSkillsInput(loadedPrefs.skills.join(', '));
        }
    }, []);

    const handleSave = () => {
        // Parse comma-separated inputs
        const roleKeywords = roleKeywordsInput
            .split(',')
            .map(k => k.trim())
            .filter(k => k.length > 0);

        const skills = skillsInput
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        const prefsToSave = {
            ...preferences,
            roleKeywords,
            skills
        };

        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefsToSave));
        alert('Preferences saved successfully!');
    };

    const handleLocationToggle = (location: string) => {
        setPreferences(prev => ({
            ...prev,
            preferredLocations: prev.preferredLocations.includes(location)
                ? prev.preferredLocations.filter(l => l !== location)
                : [...prev.preferredLocations, location]
        }));
    };

    const handleModeToggle = (mode: string) => {
        setPreferences(prev => ({
            ...prev,
            preferredMode: prev.preferredMode.includes(mode)
                ? prev.preferredMode.filter(m => m !== mode)
                : [...prev.preferredMode, mode]
        }));
    };

    return (
        <div className="settings-page">
            <div className="settings-container">
                <h1 className="settings-title">Preferences</h1>
                <p className="settings-subtitle">
                    Set your job preferences to receive precision-matched opportunities.
                </p>

                <form className="settings-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className="settings-section">
                        <Input
                            label="Role Keywords"
                            placeholder="e.g., Software Engineer, Frontend Developer, React"
                            id="role-keywords"
                            value={roleKeywordsInput}
                            onChange={(e) => setRoleKeywordsInput(e.target.value)}
                        />
                        <p className="settings-hint">Comma-separated keywords</p>
                    </div>

                    <div className="settings-section">
                        <label className="settings-label">Preferred Locations</label>
                        <div className="settings-checkbox-group">
                            {LOCATION_OPTIONS.map(location => (
                                <label key={location} className="settings-checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={preferences.preferredLocations.includes(location)}
                                        onChange={() => handleLocationToggle(location)}
                                        className="settings-checkbox"
                                    />
                                    {location}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="settings-section">
                        <label className="settings-label">Work Mode</label>
                        <div className="settings-checkbox-group">
                            {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                                <label key={mode} className="settings-checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={preferences.preferredMode.includes(mode)}
                                        onChange={() => handleModeToggle(mode)}
                                        className="settings-checkbox"
                                    />
                                    {mode}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="settings-section">
                        <label htmlFor="experience" className="settings-label">
                            Experience Level
                        </label>
                        <select
                            id="experience"
                            className="settings-select"
                            value={preferences.experienceLevel}
                            onChange={(e) => setPreferences(prev => ({ ...prev, experienceLevel: e.target.value }))}
                        >
                            <option value="">Any experience level</option>
                            <option value="Fresher">Fresher</option>
                            <option value="0-1">0-1 years</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                        </select>
                    </div>

                    <div className="settings-section">
                        <Input
                            label="Skills"
                            placeholder="e.g., React, Node.js, Python, AWS"
                            id="skills"
                            value={skillsInput}
                            onChange={(e) => setSkillsInput(e.target.value)}
                        />
                        <p className="settings-hint">Comma-separated skills</p>
                    </div>

                    <div className="settings-section">
                        <label htmlFor="min-score" className="settings-label">
                            Minimum Match Score: {preferences.minMatchScore}
                        </label>
                        <input
                            type="range"
                            id="min-score"
                            min="0"
                            max="100"
                            step="5"
                            value={preferences.minMatchScore}
                            onChange={(e) => setPreferences(prev => ({ ...prev, minMatchScore: parseInt(e.target.value) }))}
                            className="settings-slider"
                        />
                        <div className="settings-slider-labels">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                    </div>

                    <button type="submit" className="settings-save-btn">
                        Save Preferences
                    </button>
                </form>
            </div>
        </div>
    );
};
