import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle } from 'lucide-react';
import './ShipPage.css';

export const ShipPage = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if all tests are passed
        const saved = localStorage.getItem('jobTrackerTestChecklist');
        if (saved) {
            const checkedItems = JSON.parse(saved);
            setIsUnlocked(checkedItems.length === 10);
        }
    }, []);

    if (!isUnlocked) {
        return (
            <div className="ship-page">
                <div className="ship-container">
                    <div className="ship-locked">
                        <Lock size={64} className="ship-locked-icon" />
                        <h1 className="ship-locked-title">Ship Locked</h1>
                        <p className="ship-locked-message">
                            Complete all test verifications to unlock shipping.
                        </p>
                        <button onClick={() => navigate('/jt/07-test')} className="ship-locked-btn">
                            Go to Test Checklist
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ship-page">
            <div className="ship-container">
                <div className="ship-unlocked">
                    <CheckCircle size={64} className="ship-unlocked-icon" />
                    <h1 className="ship-unlocked-title">Ready to Ship! 🚀</h1>
                    <p className="ship-unlocked-message">
                        All tests have passed. Your Job Notification Tracker is production-ready.
                    </p>
                    <div className="ship-stats">
                        <div className="ship-stat">
                            <span className="ship-stat-value">✓ 10/10</span>
                            <span className="ship-stat-label">Tests Passed</span>
                        </div>
                        <div className="ship-stat">
                            <span className="ship-stat-value">✓ 0</span>
                            <span className="ship-stat-label">Console Errors</span>
                        </div>
                        <div className="ship-stat">
                            <span className="ship-stat-value">✓ All</span>
                            <span className="ship-stat-label">Features Work</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
