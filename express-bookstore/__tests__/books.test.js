process.env.NODE_ENV = "test"

const request = require("supertest");


const app = require("../app");
const db = require("../db");

let book_isbn;

beforeEach(async () => {
    let result = await db.query(`
        INSERT INTO 
        books (isbn, amazon_url,author,language,pages,publisher,title,year)   
        VALUES(
            '0691161518', 
            'http://a.co/eobPtX2', 
            'Matthew Lane', 
            'English', 
            264,  
            'Princeton University Press', 
            'Power-Up: Unlocking the Hidden Mathematics in Video Games', 
            2017) 
        RETURNING isbn`);
    book_isbn = result.rows[0].isbn
});

// TEST CREATING A BOOK
describe("POST /books", async function () {
    test("Creates a new book", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: "0694161518",
                amazon_url: "http://a.co/eobPtX2",
                author: "Matthew Lane",
                language: "English",
                pages: 264,
                publisher: "Princeton University Press",
                title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                year: 2017
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.book).toHaveProperty("isbn");
    });
  
    test("Prevents creating book without required fields", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({year: 2000});
        expect(response.statusCode).toBe(400);
    });
});

// TEST GET ALL BOOKS
describe("GET /books", async function () {
    test("Gets a list of 1 book", async function () {
        const response = await request(app).get(`/books`);
        const books = response.body.books;
        expect(books).toHaveLength(1);
        expect(books[0]).toHaveProperty("isbn");
        expect(books[0]).toHaveProperty("amazon_url");
    });
});

// GET SINGLE BOOK
describe("GET /books/:isbn", async function () {
    test("Gets a single book", async function () {
        const response = await request(app)
            .get(`/books/${book_isbn}`)
        expect(response.body.book).toHaveProperty("isbn");
        expect(response.body.book.isbn).toBe(book_isbn);
    });
    test("Responds with 404 if can't find book in question", async function () {
        const response = await request(app)
            .get(`/books/999`)
        expect(response.statusCode).toBe(404);
    });
});

// UPDATE A BOOK
describe("PUT /books/:id", async function () {
    test("Updates a single book", async function () {
        const response = await request(app)
            .put(`/books/${book_isbn}`)
            .send({
                isbn: `${book_isbn}`,
                amazon_url: "https://taco.com",
                author: "mctest",
                language: "english",
                pages: 1000,
                publisher: "yeah right",
                title: "UPDATED BOOK",
                year: 2000
            });
        expect(response.body.book).toHaveProperty("isbn");
        expect(response.body.book.title).toBe("UPDATED BOOK");
    });
});


// DELTING A BOOK
describe("DELETE /books/:id", async function () {
    test("Deletes a single a book", async function () {
        const response = await request(app)
        .delete(`/books/${book_isbn}`)
        expect(response.body).toEqual({message: "Book deleted"});
    });
});


afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
});
  
  
afterAll(async function () {
    await db.end()
});