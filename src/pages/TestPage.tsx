import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import './TestPage.css';

interface TestItem {
    id: string;
    label: string;
    howToTest: string;
}

const TEST_ITEMS: TestItem[] = [
    {
        id: 'preferences-persist',
        label: 'Preferences persist after refresh',
        howToTest: 'Go to Settings, set preferences, save, refresh page. Check Settings - preferences should remain.'
    },
    {
        id: 'match-score',
        label: 'Match score calculates correctly',
        howToTest: 'Set preferences in Settings, go to Dashboard. Jobs should show match score badges based on criteria.'
    },
    {
        id: 'show-matches-toggle',
        label: '"Show only matches" toggle works',
        howToTest: 'On Dashboard, enable "Show only jobs above threshold". Only high-scoring jobs should appear.'
    },
    {
        id: 'save-job-persist',
        label: 'Save job persists after refresh',
        howToTest: 'Click Save on a job, refresh page. Job should appear in Saved page.'
    },
    {
        id: 'apply-new-tab',
        label: 'Apply opens in new tab',
        howToTest: 'Click Apply on any job. Should open job URL in new browser tab.'
    },
    {
        id: 'status-persist',
        label: 'Status update persists after refresh',
        howToTest: 'Change job status to "Applied", refresh page. Status should remain "Applied".'
    },
    {
        id: 'status-filter',
        label: 'Status filter works correctly',
        howToTest: 'Filter by "Applied" status. Only jobs with "Applied" status should show.'
    },
    {
        id: 'digest-top-10',
        label: 'Digest generates top 10 by score',
        howToTest: 'Go to Digest, generate digest. Should show top 10 jobs sorted by match score.'
    },
    {
        id: 'digest-persist',
        label: 'Digest persists for the day',
        howToTest: 'Generate digest, refresh page. Same digest should load without regenerating.'
    },
    {
        id: 'no-console-errors',
        label: 'No console errors on main pages',
        howToTest: 'Open browser console (F12), visit all pages. No red errors should appear.'
    }
];

export const TestPage = () => {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        // Load checked items from localStorage
        const saved = localStorage.getItem('jobTrackerTestChecklist');
        if (saved) {
            setCheckedItems(new Set(JSON.parse(saved)));
        }
    }, []);

    const handleToggle = (id: string) => {
        const newChecked = new Set(checkedItems);
        if (newChecked.has(id)) {
            newChecked.delete(id);
        } else {
            newChecked.add(id);
        }
        setCheckedItems(newChecked);
        localStorage.setItem('jobTrackerTestChecklist', JSON.stringify(Array.from(newChecked)));
    };

    const handleReset = () => {
        setCheckedItems(new Set());
        localStorage.removeItem('jobTrackerTestChecklist');
    };

    const passedCount = checkedItems.size;
    const totalCount = TEST_ITEMS.length;
    const allPassed = passedCount === totalCount;

    return (
        <div className="test-page">
            <div className="test-container">
                <div className="test-header">
                    <h1 className="test-title">Test & Verification Checklist</h1>
                    <p className="test-subtitle">
                        Verify all features work correctly before shipping.
                    </p>
                </div>

                <div className="test-summary">
                    <div className="test-summary-count">
                        <span className="test-summary-label">Tests Passed:</span>
                        <span className={`test-summary-value ${allPassed ? 'test-summary-complete' : ''}`}>
                            {passedCount} / {totalCount}
                        </span>
                    </div>
                    {!allPassed && (
                        <div className="test-summary-warning">
                            ⚠️ Resolve all issues before shipping.
                        </div>
                    )}
                </div>

                <div className="test-checklist">
                    {TEST_ITEMS.map((item) => (
                        <div key={item.id} className="test-item">
                            <label className="test-item-label">
                                <input
                                    type="checkbox"
                                    checked={checkedItems.has(item.id)}
                                    onChange={() => handleToggle(item.id)}
                                    className="test-item-checkbox"
                                />
                                <span className="test-item-text">{item.label}</span>
                            </label>
                            <div
                                className="test-item-tooltip-trigger"
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <Info size={16} />
                                {hoveredItem === item.id && (
                                    <div className="test-item-tooltip">
                                        <strong>How to test:</strong>
                                        <p>{item.howToTest}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="test-actions">
                    <button onClick={handleReset} className="test-reset-btn">
                        Reset Test Status
                    </button>
                </div>
            </div>
        </div>
    );
};
