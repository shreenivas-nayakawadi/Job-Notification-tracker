import './PlaceholderPage.css';

interface PlaceholderPageProps {
    title: string;
}

export const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
    return (
        <div className="placeholder-page">
            <h1 className="placeholder-title">{title}</h1>
            <p className="placeholder-subtext">This section will be built in the next step.</p>
        </div>
    );
};
