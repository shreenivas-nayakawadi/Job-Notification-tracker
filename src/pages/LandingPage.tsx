import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './LandingPage.css';

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <div className="landing-hero">
                <h1 className="landing-headline">Stop Missing The Right Jobs.</h1>
                <p className="landing-subtext">
                    Precision-matched job discovery delivered daily at 9AM.
                </p>
                <Button
                    variant="primary"
                    onClick={() => navigate('/settings')}
                    className="landing-cta"
                >
                    Start Tracking
                </Button>
            </div>
        </div>
    );
};
