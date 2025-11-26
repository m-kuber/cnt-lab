import { db } from "../config/db.js";

// Fetch all books
export const getBooks = async (req, res) => {
  try {
    const [books] = await db.query("SELECT * FROM books");
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// Add book (Admin)
export const addBook = async (req, res) => {
  const { title, author, price, description, image_url } = req.body;
  try {
    await db.query(
      "INSERT INTO books (title, author, price, description, image_url) VALUES (?, ?, ?, ?, ?)",
      [title, author, price, description, image_url]
    );
    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add book" });
  }
};

// Delete book (Admin)
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM books WHERE id = ?", [id]);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};
