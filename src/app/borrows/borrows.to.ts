
export interface BorrowsTo{

  id: number;
  bookId: number;
  userEmail: string | undefined;
  userId: number ;
  loanDate: Date;
  returnDate: Date;
}

