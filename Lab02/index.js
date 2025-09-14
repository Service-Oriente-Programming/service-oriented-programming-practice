const express = require('express');
const BookManager = require('./books/bookManager');
const Book = require('./books/book');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const manager = new BookManager();

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /books - List all books
app.get('/books', (req, res) => {
    res.json(manager.getAllBooks());
});

// GET /books/:bookId - Get book by id
app.get('/books/:bookId', (req, res) => {
    const id = parseInt(req.params.bookId);
    const book = manager.getBookById(id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
    const { id, name, page, price } = req.body;
    if (!id || !name || !page || !price) {
        return res.status(400).json({ message: "Missing book data" });
    }
    if (manager.getBookById(id)) {
        return res.status(409).json({ message: "Book ID already exists" });
    }
    const newBook = new Book(id, name, page, price);
    manager.addBook(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:bookId - Update a book
app.put('/books/:bookId', (req, res) => {
    const id = parseInt(req.params.bookId);
    const updated = manager.updateBook(id, req.body);
    if (updated) {
        res.json(manager.getBookById(id));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// DELETE /books/:bookId - Delete a book
app.delete('/books/:bookId', (req, res) => {
    const id = parseInt(req.params.bookId);
    const deleted = manager.deleteBook(id);
    if (deleted) {
        res.json({ message: "Book deleted" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});