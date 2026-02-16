import './EmptyState.css';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    message: string;
}

export const EmptyState = ({ icon, title, message }: EmptyStateProps) => {
    return (
        <div className="empty-state">
            {icon && <div className="empty-state-icon">{icon}</div>}
            <h2 className="empty-state-title">{title}</h2>
            <p className="empty-state-message">{message}</p>
        </div>
    );
};
