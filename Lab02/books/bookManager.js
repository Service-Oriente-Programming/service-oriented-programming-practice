const Book = require('./book');

class BookManager {
    constructor() {
        this.books = [
            new Book(1, "Book One", 100, 10),
            new Book(2, "Book Two", 120, 12),
            new Book(3, "Book Three", 150, 15),
            new Book(4, "Book Four", 200, 20),
            new Book(5, "Book Five", 80, 8),
            new Book(6, "Book Six", 90, 9),
            new Book(7, "Book Seven", 110, 11),
            new Book(8, "Book Eight", 130, 13),
            new Book(9, "Book Nine", 140, 14),
            new Book(10, "Book Ten", 160, 16)
        ];
    }

    getAllBooks() {
        return this.books;
    }

    getBookById(id) {
        return this.books.find(b => b.id === id);
    }

    addBook(book) {
        this.books.push(book);
    }

    updateBook(id, data) {
        const book = this.getBookById(id);
        if (book) {
            if (data.name) book.name = data.name;
            if (data.page) book.page = data.page;
            if (data.price) book.price = data.price;
            return true;
        }
        return false;
    }

    deleteBook(id) {
        const index = this.books.findIndex(b => b.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = BookManager;