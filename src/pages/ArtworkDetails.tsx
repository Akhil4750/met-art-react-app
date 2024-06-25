import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtworkDetails } from '../services/api';
import { Artwork } from '../types';
import './ArtworkDetails.css';

const ArtworkDetails: React.FC = () => {
    const { objectId } = useParams<{ objectId: string }>();
    const [artwork, setArtwork] = useState<Artwork | null>(null);

    useEffect(() => {
        const getArtworkDetails = async () => {
            if (objectId) {
                const data = await fetchArtworkDetails(parseInt(objectId));
                setArtwork(data);
            }
        };
        getArtworkDetails();
    }, [objectId]);

    if (!artwork) return <div>Loading...</div>;

    const saveToFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites.push(artwork);
        localStorage.setItem('favorites', JSON.stringify(favorites));
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
                <button onClick={saveToFavorites} className="save-button">Save to Favorites</button>
            </div>
        </div>
    );
};

export default ArtworkDetails;
