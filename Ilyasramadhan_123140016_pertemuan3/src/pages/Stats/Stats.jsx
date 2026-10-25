import React from 'react';
import { useBooks } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';
import './Stats.css';

export const Stats = () => {
  const { books } = useBooks();
  const { total, owned, reading, wishlist } = useBookStats(books);

  return (
    <div className="stats-container">
      <h2>Statistik Perpustakaan Pribadi</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Buku</h4>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <h4>Buku Dimiliki</h4>
          <p>{owned}</p>
        </div>
        <div className="stat-card">
          <h4>Sedang Dibaca</h4>
          <p>{reading}</p>
        </div>
        <div className="stat-card">
          <h4>Rencana Beli</h4>
          <p>{wishlist}</p>
        </div>
      </div>
    </div>
  );
};