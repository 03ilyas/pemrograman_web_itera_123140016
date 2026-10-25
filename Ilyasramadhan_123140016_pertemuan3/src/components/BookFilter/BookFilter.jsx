import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookFilter.css';

export const BookFilter = () => {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter } = useBooks();

  return (
    <div className="filter-wrapper">
      <input
        type="text"
        placeholder="Cari berdasarkan judul atau penulis..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
        data-testid="search-input"
      />
      <div className="filter-buttons">
        {['semua', 'milik', 'baca', 'beli'].map((status) => (
          <button
            key={status}
            type="button"
            className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};