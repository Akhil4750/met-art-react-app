// src/components/Pagination.tsx
import React from 'react';
import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination-container">
            {currentPage > 1 && (
                <button className="pagination-button" onClick={() => onPageChange(currentPage - 1)}>
                    Previous
                </button>
            )}
            {pages.map(page => (
                <button
                    key={page}
                    className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button className="pagination-button" onClick={() => onPageChange(currentPage + 1)}>
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
