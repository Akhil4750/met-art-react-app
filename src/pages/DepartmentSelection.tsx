import React, { useState, useEffect } from 'react';
import { fetchDepartments, fetchArtworksByDepartment, fetchArtworkDetails } from '../services/api';
import { Department, Artwork } from '../types';
import Pagination from '../components/Pagination';
import './DepartmentSelection.css';
import '../components/Artworks.css';
import { Link } from 'react-router-dom';

const DepartmentSelection: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const getDepartments = async () => {
            const data = await fetchDepartments();
            setDepartments(data);
        };
        getDepartments();
    }, []);

    const handleDepartmentChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const departmentId = parseInt(event.target.value);
        setSelectedDepartment(departmentId);
        setCurrentPage(1);
        if (departmentId) {
            const artworkIds = await fetchArtworksByDepartment(departmentId);
            setTotalPages(Math.ceil(artworkIds.length / itemsPerPage));
            const artworksData = await Promise.all(
                artworkIds.slice(0, itemsPerPage).map((id: number) => fetchArtworkDetails(id))
            );
            setArtworks(artworksData);
        }
    };
    const fetchPageData = async (page: number) => {
        if (selectedDepartment) {
            const artworkIds = await fetchArtworksByDepartment(selectedDepartment);
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const artworksData = await Promise.all(
                artworkIds.slice(start, end).map((id: number) => fetchArtworkDetails(id))
            );
            setArtworks(artworksData);
        }
    };
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        fetchPageData(newPage);
    };


    return (
        <div className="department-page">
            <div className="department-selection-container">
                <select onChange={handleDepartmentChange}>
                    <option value="">Select a department</option>
                    {departments.map(dept => (
                        <option key={dept.departmentId} value={dept.departmentId}>
                            {dept.displayName}
                        </option>
                    ))}
                </select>
                <div className="artworks-container">
                    {artworks.map(art => (
                        <div key={art.objectID} className="artwork-item">
                            <Link to={`/artwork/${art.objectID}`}>
                                <img src={art.primaryImage} alt={art.title} className="artwork-image" />
                                <div className="artwork-info">
                                    <h3>{art.title}</h3>
                                    <p>{art.artistDisplayName}</p>
                                    <p>{art.objectDate}</p>
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
