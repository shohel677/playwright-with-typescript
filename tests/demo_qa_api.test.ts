import { expect } from 'chai';
import { BooksAPI } from '../pages/books_api';
import { Utils } from "../utils/utils";

describe('DemoQA Books API Test Suite', function () {
    this.timeout(20000);

    const booksAPI = new BooksAPI();
    const username = `user_${Date.now()}`;
    const password = 'Password@123';

    before(async () => {
        const userResponse = await booksAPI.createUser(username, password);
        Utils.logger.info('Response body : ' + JSON.stringify(userResponse.data, null, 2));
        Utils.logger.info('Response status : ' + userResponse.status);
        expect(booksAPI.userId).to.be.a('string');

        const tokenResponse = await booksAPI.generateToken(username, password);
        Utils.logger.info('Token Generated: ' + JSON.stringify(tokenResponse.data, null, 2));
        Utils.logger.info('Response status : ' + userResponse.status);
        expect(booksAPI.token).to.be.a('string');
    });

    afterEach(async () => {
        Utils.logger.info("Call Completed ###########################");
    });

    it('[testcase_api] Should fetch list of books', async () => {
        const books = await booksAPI.getBooks();
        expect(books).to.be.an('array').that.is.not.empty;
    });

    it('[testcase_api]  Should fetch a book by ISBN', async () => {
        const books = await booksAPI.getBooks();
        const isbn = books[0].isbn;

        const book = await booksAPI.getBookByISBN(isbn);
        Utils.logger.info(`📖 Book Details (ISBN: ${isbn}):` + book);
        expect(book.isbn).to.equal(isbn);
    });

    it('[testcase_api]  Should add a book to user collection', async () => {
        const books = await booksAPI.getBooks();
        const isbn = books[0].isbn;

        const status = await booksAPI.addBookToUser(isbn);
        Utils.logger.info(`Book Added to Collection (ISBN: ${isbn}), Status:` + status);
        expect(status).to.equal(201);
    });

    it('[testcase_api]  Should delete a book from user collection', async () => {
        const books = await booksAPI.getBooks();
        const isbn = books[0].isbn;

        const status = await booksAPI.deleteBookFromUser(isbn);
        Utils.logger.info(`Book Deleted from Collection (ISBN: ${isbn}), Status:` + status);
        expect(status).to.equal(204);
    });
});
