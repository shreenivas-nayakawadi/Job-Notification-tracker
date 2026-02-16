import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

export const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/saved', label: 'Saved' },
        { to: '/digest', label: 'Digest' },
        { to: '/settings', label: 'Settings' },
        { to: '/proof', label: 'Proof' },
    ];

    return (
        <nav className="navigation">
            <div className="nav-container">
                <button
                    className="nav-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className={`nav-list ${isMenuOpen ? 'nav-list-open' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
