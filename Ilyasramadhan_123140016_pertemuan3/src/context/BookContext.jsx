import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('personal_books', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [editingBook, setEditingBook] = useState(null);

  const addBook = (bookData) => {
    const newBook = { id: Date.now().toString(), ...bookData };
    setBooks((prev) => [newBook, ...prev]);
  };

  const updateBook = (id, updatedData) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updatedData } : book))
    );
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      statusFilter === 'semua' || book.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <BookContext.Provider
      value={{
        books,
        filteredBooks,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        editingBook,
        setEditingBook,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error('useBooks must be used within a BookProvider');
  return context;
};