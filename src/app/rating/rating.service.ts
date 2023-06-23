import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIEndpointURLs} from "../api-endpoint-urls";
import {Observable} from "rxjs";

import {Rating} from "./rating";
import {Book} from "../book/book";

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

}
