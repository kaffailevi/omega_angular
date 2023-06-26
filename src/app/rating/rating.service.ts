import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIEndpointURLs} from "../api-endpoint-urls";
import {Observable} from "rxjs";

import {Rating} from "./rating";
import {Book} from "../book/book";
import {User} from "../users/models/user.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) {
  }

  public getRatingsByBookId(bookId: number | undefined): Observable<Rating[]> {
    return this.http.get<Rating[]>(APIEndpointURLs.ratingsByBookId + bookId);
  }

  public getBook(bookId: number | undefined): Observable<Book> {
    return this.http.get<Book>(APIEndpointURLs.bookById + bookId);
  }

  addRating(rating: Rating) {
    return this.http.post<Rating>(APIEndpointURLs.ratingNew, rating);
  }

  getUsername(userId: number): Observable<string> {
    {
      return this.http.get<User>(APIEndpointURLs.user + userId).pipe(
        map(user => user?.username)
      );
    }
  }

  deleteById(ratingId: number | undefined) {
    return this.http?.delete(APIEndpointURLs.ratingDelete + ratingId);
  }

}
