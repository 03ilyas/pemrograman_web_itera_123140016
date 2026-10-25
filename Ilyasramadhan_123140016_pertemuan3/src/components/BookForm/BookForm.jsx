import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

export const BookForm = ({ initialData = null, onSubmit = () => {}, onCancel = () => {} }) => {
  const [formData, setFormData] = useState({ title: '', author: '', status: 'milik' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        status: initialData.status || 'milik',
      });
    } else {
      setFormData({ title: '', author: '', status: 'milik' });
    }
  }, [initialData]);

  const validate = () => {
    const err = {};
    if (!formData.title || !formData.title.trim()) err.title = 'Judul buku wajib diisi';
    if (!formData.author || !formData.author.trim()) err.author = 'Nama penulis wajib diisi';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    setFormData({ title: '', author: '', status: 'milik' });
    setErrors({});
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} data-testid="book-form">
      <div className="form-group">
        <label htmlFor="input-title">Judul Buku</label>
        <input
          id="input-title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={errors.title ? 'input-error' : ''}
          placeholder="Masukkan judul buku"
          data-testid="input-title"
        />
        {errors.title && <span className="error-msg">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="input-author">Nama Penulis</label>
        <input
          id="input-author"
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className={errors.author ? 'input-error' : ''}
          placeholder="Masukkan nama penulis"
          data-testid="input-author"
        />
        {errors.author && <span className="error-msg">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="select-status">Status Buku</label>
        <select
          id="select-status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          data-testid="select-status"
        >
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Perbarui Buku' : 'Tambah Buku'}
        </button>
        {initialData && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

BookForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};