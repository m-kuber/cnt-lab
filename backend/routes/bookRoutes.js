import express from "express";
import { getBooks, addBook, deleteBook } from "../controllers/bookController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", verifyToken, verifyAdmin, addBook);
router.delete("/:id", verifyToken, verifyAdmin, deleteBook);

export default router;
