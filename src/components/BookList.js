
import React from 'react';

function BookList({ books, onDelete, onEdit }) {
  if (books.length === 0) {
    return <p>Belum ada buku dalam daftar.</p>;
  }

  return (
    <div>
      <h2>Daftar Buku ({books.length})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => onEdit(book)}>Ubah</button>
                {' '}
                <button onClick={() => onDelete(book.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;