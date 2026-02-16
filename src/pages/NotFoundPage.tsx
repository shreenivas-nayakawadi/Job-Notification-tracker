import './NotFoundPage.css';

export const NotFoundPage = () => {
    return (
        <div className="notfound-page">
            <h1 className="notfound-title">404</h1>
            <p className="notfound-subtitle">Page Not Found</p>
            <p className="notfound-text">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <a href="/dashboard" className="notfound-link">
                ← Back to Dashboard
            </a>
        </div>
    );
};
