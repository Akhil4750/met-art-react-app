import React, { useState } from 'react';
import { Artwork } from '../types';
import { Link } from 'react-router-dom';
import '../components/Artworks.css';
import './Favorites.css';

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<Artwork[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));

    const removeFromFavorites = (objectID: number) => {
        const updatedFavorites = favorites.filter(art => art.objectID !== objectID);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="Favorite-container">
            <h1>Favorite Artworks</h1>
            <div className="artworks-container">
                {favorites.map(art => (
                    <div key={art.objectID} className="artwork-item">
                        <Link to={`/artwork/${art.objectID}`}>
                            <img src={art.primaryImage} alt={art.title} className="artwork-image" />
                            <div className="artwork-info">
                                <h3>{art.title}</h3>
                                <p>{art.artistDisplayName}</p>
                                <p>{art.objectDate}</p>
                            </div>
                        </Link>
                        <button className="remove-button" onClick={() => removeFromFavorites(art.objectID)}>Remove</button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;