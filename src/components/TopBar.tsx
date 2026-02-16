import './TopBar.css';
import { Sidebar } from 'lucide-react'; // Placeholder icon

interface TopBarProps {
    projectName: string;
    currentStep: number;
    totalSteps: number;
    status: 'Not Started' | 'In Progress' | 'Shipped';
}

export const TopBar = ({
    projectName,
    currentStep,
    totalSteps,
    status,
}: TopBarProps) => {
    return (
        <div className="topbar-container">
            <div className="topbar-left">
                <Sidebar className="topbar-icon" size={20} />
                <span className="topbar-project-name">{projectName}</span>
            </div>

            <div className="topbar-center">
                Step {currentStep} / {totalSteps}
            </div>

            <div className="topbar-right">
                <span className={`status-badge status-${status.toLowerCase().replace(' ', '-')}`}>
                    {status}
                </span>
            </div>
        </div>
    );
};
