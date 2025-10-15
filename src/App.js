import './App.css'; 

import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

const LOCAL_STORAGE_KEY = 'react-books-app.books';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null); 

  
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedBooks) {
      setBooks(storedBooks);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  // Fungsi Tambah/Ubah (Create & Update)
  const addBook = (newBook) => {
    if (editingBook) {
     
      setBooks(
        books.map((book) =>
          book.id === editingBook.id ? { ...book, ...newBook } : book
        )
      );
      setEditingBook(null); 
    } else {
      
      const bookWithId = {
        ...newBook,
        id: Date.now(), 
      };
      setBooks([...books, bookWithId]);
    }
  };

  // Fungsi Hapus (Delete)
  const deleteBook = (id) => {
    
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