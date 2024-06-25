import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/MetLogo.png';
import './Navbar.css';

interface NavbarProps {
    resetHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ resetHome }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="MET Logo" />
            </div>
            <div className="navbar-links">
                <Link to="/" onClick={resetHome} >Home</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/departments">Departments</Link>
            </div>
        </nav>
    );
};

export default Navbar;
