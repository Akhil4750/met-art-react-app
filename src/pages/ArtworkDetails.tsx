//src/pages/ArtworkDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtworkDetails } from '../services/api';
import { Artwork } from '../types';
import './ArtworkDetails.css';

const ArtworkDetails: React.FC = () => {
    const { objectId } = useParams<{ objectId: string }>();// Retrieve objectId from URL parameters
    const [artwork, setArtwork] = useState<Artwork | null>(null); // State to store artwork details
    const [isFavorite, setIsFavorite] = useState(false); // State to check if artwork is already in favorites



    useEffect(() => {
        // Fetch artwork details when component mounts or objectId changes
        const getArtworkDetails = async () => {
            if (objectId) {
                const data = await fetchArtworkDetails(parseInt(objectId));
                setArtwork(data);
                // Check if artwork is already in favorites
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                const favoriteExists = favorites.some((fav: Artwork) => fav.objectID === data.objectID);
                setIsFavorite(favoriteExists); // Set isFavorite state
            }
        };
        getArtworkDetails();
    }, [objectId]);

    if (!artwork) return <div>Loading...</div>; // Display loading state

    const saveToFavorites = () => {
        // Save artwork to local storage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites.push(artwork);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(true); // Update isFavorite state
    };

    return (
        <div className="artwork-details-container">
            <div className="artwork-image-container">
                <img src={artwork.primaryImage} alt={artwork.title} className="artwork-image" />
            </div>
            <div className="artwork-info-container">
                <h1>{artwork.title}</h1>
                <p className="artist-info">
                    <span className="artist-name">{artwork.artistDisplayName}</span>
                    <span className="artist-nationality">{artwork.artistNationality}</span>
                    <span className="artist-date">{artwork.objectDate}</span>
                </p>
                <p className="artwork-description">{artwork.description}</p>

                <button
                    onClick={saveToFavorites}
                    className={`save-button ${isFavorite ? 'favorite' : ''}`} // Applied favorite class conditionally
                    disabled={isFavorite} // Disable button if already in favorites
                >
                    {isFavorite ? "Added to Favorites" : "Save to Favorites"}
                </button>
            </div>
        </div>
    );
};

export default ArtworkDetails;
