import { Input } from '../components/Input';
import './SettingsPage.css';

export const SettingsPage = () => {
    return (
        <div className="settings-page">
            <div className="settings-container">
                <h1 className="settings-title">Preferences</h1>
                <p className="settings-subtitle">
                    Set your job preferences to receive precision-matched opportunities.
                </p>

                <form className="settings-form">
                    <div className="settings-section">
                        <Input
                            label="Role Keywords"
                            placeholder="e.g., Software Engineer, Frontend Developer"
                            id="role-keywords"
                        />
                    </div>

                    <div className="settings-section">
                        <Input
                            label="Preferred Locations"
                            placeholder="e.g., Bangalore, Remote, Pune"
                            id="locations"
                        />
                    </div>

                    <div className="settings-section">
                        <label htmlFor="mode" className="settings-label">
                            Work Mode
                        </label>
                        <select id="mode" className="settings-select">
                            <option value="">Select mode</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="onsite">Onsite</option>
                        </select>
                    </div>

                    <div className="settings-section">
                        <label htmlFor="experience" className="settings-label">
                            Experience Level
                        </label>
                        <select id="experience" className="settings-select">
                            <option value="">Select experience level</option>
                            <option value="0-1">0-1 years</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5+">5+ years</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    );
};
