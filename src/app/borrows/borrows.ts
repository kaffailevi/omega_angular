import { Book } from './../book/book';
export interface Borrows{
    id: number;
    bookId: number;
    userId: number;
    loanDate: Date;
    returnDate: Date;
}