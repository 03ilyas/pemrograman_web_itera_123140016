import React from 'react';
import { useBooks } from '../../context/BookContext';
import { BookForm } from '../../components/BookForm/BookForm';
import { BookFilter } from '../../components/BookFilter/BookFilter';
import { BookList } from '../../components/BookList/BookList';

export const Home = () => {
  const { filteredBooks, editingBook, setEditingBook, addBook, updateBook, deleteBook } = useBooks();

  const handleFormSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
    } else {
      addBook(data);
    }
  };

  return (
    <div>
      <BookForm
        initialData={editingBook}
        onSubmit={handleFormSubmit}
        onCancel={() => setEditingBook(null)}
      />
      <BookFilter />
      <BookList books={filteredBooks} onEdit={setEditingBook} onDelete={deleteBook} />
    </div>
  );
};