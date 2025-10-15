import './App.css'; 
// src/App.js
import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

const LOCAL_STORAGE_KEY = 'react-books-app.books';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null); // State untuk buku yang sedang di-edit

  // 1. READ: Memuat data dari Local Storage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedBooks) {
      setBooks(storedBooks);
    }
  }, []);

  // Menyimpan data ke Local Storage setiap kali state 'books' berubah
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  // Fungsi Tambah/Ubah (Create & Update)
  const addBook = (newBook) => {
    if (editingBook) {
      // Logika Update (jika ada buku yang sedang di-edit)
      setBooks(
        books.map((book) =>
          book.id === editingBook.id ? { ...book, ...newBook } : book
        )
      );
      setEditingBook(null); // Reset mode edit
    } else {
      // Logika Create (Tambah)
      const bookWithId = {
        ...newBook,
        id: Date.now(), // ID sederhana menggunakan timestamp
      };
      setBooks([...books, bookWithId]);
    }
  };

  // Fungsi Hapus (Delete)
  const deleteBook = (id) => {
    // Menghapus buku berdasarkan ID
    setBooks(books.filter((book) => book.id !== id));
  };

  // Fungsi untuk masuk ke mode edit
  const startEdit = (book) => {
    setEditingBook(book);
  };

  return (
    <div className="container">
      <h1>MANAJEMEN BUKU</h1>
      <BookForm addBook={addBook} editingBook={editingBook} />
      <hr />
      <BookList books={books} onDelete={deleteBook} onEdit={startEdit} />
    </div>
  );
}

export default App;