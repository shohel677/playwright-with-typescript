import axios, { AxiosResponse } from 'axios';
import {Utils} from "../utils/utils";

export class BooksAPI extends Utils{

    token = '';
    userId = '';

    async createUser(username: string, password: string): Promise<AxiosResponse> {
        const res = await axios.post(`${this.baseURL}/Account/v1/User`, {
            userName: username,
            password: password
        });
        this.userId = res.data.userID;
        return res;
    }

    async generateToken(username: string, password: string): Promise<AxiosResponse> {
        const res = await axios.post(`${this.baseURL}/Account/v1/GenerateToken`, {
            userName: username,
            password: password
        });
        this.token = res.data.token;
        return res;
    }

    async getBooks() {
        const res = await axios.get(`${this.baseURL}/BookStore/v1/Books`);
        Utils.logger.info('Response body : ' + JSON.stringify(res.data, null, 2));
        Utils.logger.info('Response status : '+ res.status);
        return res.data.books;
    }

    async getBookByISBN(isbn: string) {
        const res = await axios.get(`${this.baseURL}/BookStore/v1/Book?ISBN=${isbn}`);
        Utils.logger.info('Response body : ' + JSON.stringify(res.data, null, 2));
        Utils.logger.info('Response status : '+ res.status);
        return res.data;
    }

    async addBookToUser(isbn: string) {
        const res = await axios.post(`${this.baseURL}/BookStore/v1/Books`, {
            userId: this.userId,
            collectionOfIsbns: [{ isbn }]
        }, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
        Utils.logger.info('Response body : ' + JSON.stringify(res.data, null, 2));
        Utils.logger.info('Response status : '+ res.status);
        return res.status;
    }

    async deleteBookFromUser(isbn: string) {
        const res = await axios.delete(`${this.baseURL}/BookStore/v1/Book`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            data: {
                isbn,
                userId: this.userId
            }
        });
        Utils.logger.info('Response body : ' + JSON.stringify(res.data, null, 2));
        Utils.logger.info('Response status : '+ res.status);
        return res.status;
    }
}
