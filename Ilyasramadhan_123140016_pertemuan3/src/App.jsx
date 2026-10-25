import React, { useState } from 'react';
import { BookProvider } from './context/BookContext';
import { Home } from './pages/Home/Home';
import { Stats } from './pages/Stats/Stats';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <BookProvider>
      <div className="container">
        <nav className="navbar">
          <h1 className="nav-title">Koleksi Buku Pribadi</h1>
          <div className="nav-links">
            <button
              type="button"
              className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Beranda
            </button>
            <button
              type="button"
              className={`nav-btn ${currentPage === 'stats' ? 'active' : ''}`}
              onClick={() => setCurrentPage('stats')}
            >
              Statistik
            </button>
          </div>
        </nav>

        {currentPage === 'home' ? <Home /> : <Stats />}
      </div>
    </BookProvider>
  );
}