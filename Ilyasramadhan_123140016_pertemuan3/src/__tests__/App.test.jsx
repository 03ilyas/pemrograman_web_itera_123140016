import { describe, it, expect, vi, beforeEach } from 'vitest';

// Fungsi helper penghitung statistik (sesuai logika useBookStats)
const calculateStats = (books = []) => {
  const total = books.length;
  const owned = books.filter((b) => b.status === 'milik').length;
  const reading = books.filter((b) => b.status === 'baca').length;
  const wishlist = books.filter((b) => b.status === 'beli').length;
  return { total, owned, reading, wishlist };
};

// Fungsi validasi input form (sesuai logika BookForm)
const validateBookForm = (data) => {
  const errors = {};
  if (!data.title || !data.title.trim()) errors.title = 'Judul buku wajib diisi';
  if (!data.author || !data.author.trim()) errors.author = 'Nama penulis wajib diisi';
  return errors;
};

// Fungsi filter buku (sesuai logika BookFilter/BookContext)
const filterBooks = (books, query = '', status = 'semua') => {
  return books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === 'semua' || book.status === status;
    return matchesSearch && matchesStatus;
  });
};

describe('Unit Testing Aplikasi Manajemen Buku Pribadi', () => {
  beforeEach(() => {
    const store = {};
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value.toString();
      }),
      clear: vi.fn(() => {
        for (const key in store) delete store[key];
      }),
    });
  });

  // Test 1: Menghitung statistik saat ada data buku
  it('1. Menghitung akumulasi statistik buku dengan tepat', () => {
    const sampleBooks = [
      { id: '1', title: 'Clean Code', author: 'Robert C. Martin', status: 'milik' },
      { id: '2', title: 'Refactoring', author: 'Martin Fowler', status: 'baca' },
      { id: '3', title: 'The Pragmatic Programmer', author: 'Andy Hunt', status: 'beli' },
      { id: '4', title: 'Design Patterns', author: 'GoF', status: 'milik' },
    ];
    const stats = calculateStats(sampleBooks);

    expect(stats.total).toBe(4);
    expect(stats.owned).toBe(2);
    expect(stats.reading).toBe(1);
    expect(stats.wishlist).toBe(1);
  });

  // Test 2: Menghitung statistik saat data kosong
  it('2. Mengembalikan nilai 0 jika data koleksi buku kosong', () => {
    const stats = calculateStats([]);

    expect(stats.total).toBe(0);
    expect(stats.owned).toBe(0);
    expect(stats.reading).toBe(0);
    expect(stats.wishlist).toBe(0);
  });

  // Test 3: Validasi input form yang kosong
  it('3. Mendeteksi dan mengembalikan error jika form dikirim dalam keadaan kosong', () => {
    const errors = validateBookForm({ title: '', author: '' });

    expect(errors.title).toBe('Judul buku wajib diisi');
    expect(errors.author).toBe('Nama penulis wajib diisi');
  });

  // Test 4: Validasi input form yang valid
  it('4. Tidak menghasilkan error jika judul dan penulis diisi dengan benar', () => {
    const errors = validateBookForm({ title: 'React Modern', author: 'Ilyas Ramadhan' });

    expect(Object.keys(errors).length).toBe(0);
  });

  // Test 5: Filter dan pencarian data buku
  it('5. Menyaring buku berdasarkan status dan kata kunci pencarian secara akurat', () => {
    const books = [
      { id: '1', title: 'Belajar React Dasar', author: 'Dan Abramov', status: 'milik' },
      { id: '2', title: 'Pemrograman Web Modern', author: 'Ilyas Ramadhan', status: 'baca' },
      { id: '3', title: 'Algoritma Pemrograman', author: 'Donald Knuth', status: 'beli' },
    ];

    const resultStatus = filterBooks(books, '', 'baca');
    expect(resultStatus).toHaveLength(1);
    expect(resultStatus[0].title).toBe('Pemrograman Web Modern');

    const resultSearch = filterBooks(books, 'React', 'semua');
    expect(resultSearch).toHaveLength(1);
    expect(resultSearch[0].author).toBe('Dan Abramov');
  });
});