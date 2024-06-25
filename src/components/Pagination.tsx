//src/components/Pagination.tsx
import React from 'react';
import './Pagination.css';

// Interface for Pagination props
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    // Determine start and end pages for pagination
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);
    // Adjust start and end pages for edge cases
    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    }
    if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 4, 1);
    }
    // Create an array of page numbers
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

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
