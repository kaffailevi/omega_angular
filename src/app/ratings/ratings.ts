import { User } from './../users/models/user.model';
import { Book } from './../book/book';
import { ɵExtraLocaleDataIndex } from '@angular/core';
enum RatingEnum{
  RATING1 = 'RATING1',
  RATING2 = 'RATING2',
  RATING3 = 'RATING3',
  RATING4 = 'RATING4',
  RATING5 = 'RATING5',
}

export  interface Ratings{
    id: number;
    book: Book;
    user: User;
    rating: RatingEnum;
    reviewTitle: String;
    review: String;
    date: Date;
}