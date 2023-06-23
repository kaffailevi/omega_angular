import {Component} from '@angular/core';
import {Rating} from "./rating";

import {ActivatedRoute} from "@angular/router";
import {RatingService} from "./rating.service";
import {Book} from "../book/book";


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  public ratings: Rating[] | undefined;
  public bookId: number | undefined;
  private book: Book | undefined;


  constructor(private activeRoute: ActivatedRoute,
              private ratingService: RatingService) {
    activeRoute.params.subscribe(
      params => {
        this.bookId = params['id'];
      });

  }

  public getRatings(): void {
    this.ratingService.getRatingsByBookId(this.bookId).subscribe(
      {
        next: (value: Rating[]) => {
          this.ratings = value;
          console.log(this.ratings);
        },
        error: (error: any) => {
          alert(error.message);
        },
      }
    )
  }

  ngOnInit() {
    this.getRatings();
    this.ratingService.getBook(this.bookId).subscribe(
      value => {
        this.book = value;
        console.log(this.book);
      }
    );
  }


}
