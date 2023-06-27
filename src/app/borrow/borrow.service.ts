import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Borrow} from "./borrow";
import {HttpClient} from "@angular/common/http";
import {Book} from "../book/book";
import {APIEndpointURLs} from "../api-endpoint-urls";
import {environment} from "../../environment/environment";

@Injectable({providedIn: 'root'})
export class BorrowService{
  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public getBook(bookId: number | undefined): Observable<Book> {
    return this.http.get<Book>(APIEndpointURLs.bookById + bookId);
  }
  public addBorrows(): Observable<Borrow[]>{
    return this.http.post<Borrow[]>(`${this.apiServerUrl}/borrow/add`,this.addBorrows());
  }
}
