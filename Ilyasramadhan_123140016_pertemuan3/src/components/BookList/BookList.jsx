import React from 'react';
import PropTypes from 'prop-types';
import './BookList.css';

export const BookList = ({ books = [], onEdit = () => {}, onDelete = () => {} }) => {
  if (books.length === 0) {
    return <p className="empty-text">Belum ada daftar buku yang sesuai.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card" data-testid="book-item">
          <div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">Oleh: {book.author}</p>
            <span className={`status-tag status-${book.status}`}>{book.status}</span>
          </div>
          <div className="card-actions">
            <button type="button" className="btn-edit" onClick={() => onEdit(book)}>Edit</button>
            <button type="button" className="btn-delete" onClick={() => onDelete(book.id)}>Hapus</button>
          </div>
        </div>
      ))}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};