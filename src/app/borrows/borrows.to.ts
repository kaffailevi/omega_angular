export interface BorrowsTo {
  id: number;
  bookId: number;
  userEmail: string | undefined;
  userFirstname: string | undefined;
  userLastname: string | undefined;
  userId: number;
  loanDate: Date;
  returnDate: Date;
  profileImg: string | undefined;
}
