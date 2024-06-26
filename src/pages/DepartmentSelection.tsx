//src/pages/DepartmentSelection.tsx
import React, { useState, useEffect } from 'react';
import { fetchDepartments, fetchArtworksByDepartment, fetchArtworkDetails } from '../services/api';
import { Department, Artwork } from '../types';
import Pagination from '../components/Pagination';
import './DepartmentSelection.css';
import '../components/Artworks.css';
import { Link } from 'react-router-dom';

const DepartmentSelection: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);// State to store departments
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const [artworkIdList, setArtworkIdList] = useState<number[]>([]);

    useEffect(() => {
        // Fetch departments when component mounts
        const getDepartments = async () => {
            const data = await fetchDepartments();
            setDepartments(data);
        };
        getDepartments();
    }, []);

    const handleDepartmentChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Handle department selection change
        const departmentId = parseInt(event.target.value);
        setSelectedDepartment(departmentId);
        setCurrentPage(1);
        if (departmentId) {
            const artworkIds = await fetchArtworksByDepartment(departmentId);
            setArtworkIdList(artworkIds); // Store the fetched artwork IDs

            setTotalPages(Math.ceil(artworkIds.length / itemsPerPage));
            const artworksData = await Promise.all(
                artworkIds.slice(0, itemsPerPage).map((id: number) => fetchArtworkDetails(id))
            );
            setArtworks(artworksData);
        }
    };

    const fetchPageData = async (page: number) => {
        // Fetch data for the specified page
        if (selectedDepartment) {

            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const artworksData = await Promise.all(
                artworkIdList.slice(start, end).map((id: number) => fetchArtworkDetails(id))
            );
            setArtworks(artworksData);
        }
    };

    const handlePageChange = (page: number) => {
        // Handle page change
        setCurrentPage(page);
        fetchPageData(page);
    };

    return (
        <div className="department-page">
            <div className="department-selection-container">
                <select onChange={handleDepartmentChange}>
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                        <option key={dept.departmentId} value={dept.departmentId}>
                            {dept.displayName}
                        </option>
                    ))}
                </select>
                <div className="artworks-container">
                    {artworks.map(artwork => (
                        <div key={artwork.id} className="artwork-item">
                            <Link to={`/artwork/${artwork.objectID}`}>
                                <img src={artwork.primaryImage} alt={artwork.title} className="artwork-image" />
                                <div className="artwork-info">
                                    <h3>{artwork.title}</h3>
                                    <p>{artwork.artistDisplayName}</p>
                                    <p>{artwork.objectDate}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default DepartmentSelection;
