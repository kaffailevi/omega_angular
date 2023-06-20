import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Borrows } from './borrows';

import { APIEndpointURLs } from '../api-endpoint-urls';

@Injectable({
  providedIn: 'root'
})
export class BorrowsService {

  private apiServerUrl = APIEndpointURLs.borrowsUrl;
  constructor(private http: HttpClient) { }

  public getBorrows(): Observable<Borrows[]> {
    return this.http.get<Borrows[]>(`${this.apiServerUrl}/all`);
  }

  public getBorrowById(borrowId: number): Observable<Borrows> {
    return this.http.get<Borrows>(`${this.apiServerUrl}/id/${borrowId}`);
  }

  public getBorrowsByUserId(userId: number): Observable<Borrows[]> {
    return this.http.get<Borrows[]>(`${this.apiServerUrl}/all_by_userid/${userId}`);
  }

  public getBorrowsByBookId(bookId: number): Observable<Borrows[]> {
    return this.http.get<Borrows[]>(`${this.apiServerUrl}/all_by_bookid/${bookId}`);
  }
  
  public getBorrowsLoanBetween(startDate: string, endDate: string): Observable<Borrows[]> {
    return this.http.get<Borrows[]>(`${this.apiServerUrl}/loan_between/${startDate}/${endDate}`);
  }

  public getBorrowsReturnDateLessThan(date: string): Observable<Borrows[]> {
    return this.http.get<Borrows[]>(`${this.apiServerUrl}/return_date_less_than/${date}`);
  }

  public addBorrow(borrow: Borrows): Observable<Borrows> {
    return this.http.post<Borrows>(`${this.apiServerUrl}/new`, borrow);
  }

  public updateBorrow(borrow: Borrows): Observable<Borrows> {
    return this.http.put<Borrows>(`${this.apiServerUrl}/update`, borrow);
  }

  public deleteBorrow(borrowId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${borrowId}`);
  }
}
