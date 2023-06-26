
export class BorrowsTo{
  constructor(id: number, bookId: number, userName: string, loanDate: Date, returnDate: Date) {
    this.id = id;
    this.bookId = bookId;
    this.userName = userName;
    this.loanDate = loanDate;
    this.returnDate = returnDate;
  }
  id: number;
  bookId: number;
  userName: string;
  loanDate: Date;
  returnDate: Date;
}

