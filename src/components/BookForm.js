// src/components/BookForm.js
import React, { useState, useEffect } from 'react';

function BookForm({ addBook, editingBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Mengisi form jika dalam mode edit
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
    } else {
      // Reset form jika keluar dari mode edit
      setTitle('');
      setAuthor('');
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) {
      alert('Judul dan Penulis tidak boleh kosong!');
      return;
    }
    
    // Panggil fungsi addBook dari App.js
    addBook({ title, author });
    
    // Kosongkan form setelah submit
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingBook ? 'Ubah Data Buku' : 'Tambah Buku Baru'}</h2>
      <div>
        <label>Judul:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Penulis:</label>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <button type="submit">
        {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
      </button>
    </form>
  );
}

export default BookForm;