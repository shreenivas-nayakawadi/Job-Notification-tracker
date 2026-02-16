import './ContextHeader.css';

interface ContextHeaderProps {
    title: string;
    subtext: string;
}

export const ContextHeader = ({ title, subtext }: ContextHeaderProps) => {
    return (
        <div className="context-header">
            <h1 className="context-title">{title}</h1>
            <p className="context-subtext">{subtext}</p>
        </div>
    );
};
