import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import {
    LandingPage,
    DashboardPage,
    SavedPage,
    DigestPage,
    SettingsPage,
    ProofPage,
    NotFoundPage
} from './pages';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-root">
                <Navigation />
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/saved" element={<SavedPage />} />
                        <Route path="/digest" element={<DigestPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/proof" element={<ProofPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
