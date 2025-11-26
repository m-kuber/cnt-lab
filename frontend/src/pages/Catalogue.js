import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import "./Catalogue.css";

const API_URL = "http://localhost:5000/api/books";

function Catalogue() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Admin: Add book
  const handleAddBook = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !author || !price) {
      setError("Title, Author, and Price are required");
      return;
    }

    try {
      await axios.post(API_URL, { title, author, price, description, image_url }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle(""); setAuthor(""); setPrice(""); setDescription(""); setImageUrl("");
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add book");
    }
  };

  // Admin: Delete book
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="catalogue-container">
      <h2>Book Catalogue</h2>

      {isAdmin && (
        <form className="add-book-form" onSubmit={handleAddBook}>
          <h3>Add New Book</h3>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="text" placeholder="Image URL" value={image_url} onChange={(e) => setImageUrl(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          {error && <p className="error">{error}</p>}
          <button type="submit">Add Book</button>
        </form>
      )}

      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} isAdmin={isAdmin} onDelete={handleDeleteBook} />
        ))}
      </div>
    </div>
  );
}

export default Catalogue;
