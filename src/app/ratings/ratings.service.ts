import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { APIEndpointURLs } from '../api-endpoint-urls';
import { Ratings } from './ratings';





@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private apiServerUrl = APIEndpointURLs.ratingsUrl;
  constructor(private http: HttpClient) { }

  public getAllRatings(): Observable<Ratings[]>{
    return this.http.get<Ratings[]>(`${this.apiServerUrl}/all`);
  }

  public getRatingsByUserId(UserId: number): Observable<Ratings[]>{
    return this.http.get<Ratings[]>(`${this.apiServerUrl}/userId/${UserId}`);
  }

  public getRatingsByBookId(BookId: number): Observable<Ratings[]>{
    return this.http.get<Ratings[]>(`${this.apiServerUrl}/bookId/${BookId}`);
  }

  public saveNewRating(Rating: Ratings): Observable<Ratings>{
    return this.http.post<Ratings>(`${this.apiServerUrl}/save`, Rating);
  }

  public deleteRating(RatingId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/${RatingId}`);
  }
    
}
