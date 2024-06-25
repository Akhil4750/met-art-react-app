// src/pages/Home.tsx
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';// For navigation

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Welcome to MMA</h1>
            <Link to="/departments"><button className="explore-button">Explore</button></Link>
        </div>
    );
};

export default Home;
