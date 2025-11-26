import React from "react";
import "./BookCard.css";

function BookCard({ book, isAdmin, onDelete }) {
  return (
    <div className="book-card">
      <img src={book.image_url || "https://via.placeholder.com/150"} alt={book.title} />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Price:</strong> ₹{book.price}</p>
        <p>{book.description}</p>
        {isAdmin && (
          <button className="delete-btn" onClick={() => onDelete(book.id)}>Delete</button>
        )}
      </div>
    </div>
  );
}

export default BookCard;
