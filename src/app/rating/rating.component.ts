import {Component} from '@angular/core';
import {Rating} from "./rating";

import {ActivatedRoute, Router} from "@angular/router";
import {RatingService} from "./rating.service";
import {Book} from "../book/book";
import {AppComponent} from "../app.component";
import {AccountService} from "../account/component/services/account.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {RatingUser} from "./rating.user";


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  public ratings: RatingUser[] | undefined;
  public bookId: number | undefined;
  public book: Book | undefined;
  public isLoggedIn: boolean | undefined;
  public role: string | null;
  public firstName: string | null;
  public deleteRating: Rating | undefined;


  constructor(private activeRoute: ActivatedRoute,
              private ratingService: RatingService,
              private route: ActivatedRoute,
              private appComponent: AppComponent,
              private accountService: AccountService,
              private router: Router) {
    activeRoute.params.subscribe(
      params => {
        this.bookId = params['id'];
      });
    ratingService.getBook(this.bookId).subscribe(
      {
        next: (value: Book) => this.book = value
      }
    )
    console.log(this.book);
    this.isLoggedIn = accountService.isLoggedIn();
    this.firstName = accountService.getFirstName();
    this.role = accountService.getRole();


  }



  public getRatings(): void {
    this.ratingService.getRatingsByBookId(this.bookId).subscribe(
      {
        next: (value: Rating[]) => {
          this.ratings = value.map<RatingUser>((rating, index, array) => {
            let username:string = "";

            let tmp: RatingUser = {
              id: rating.id,
              user_name: username,
              rating: rating.rating,
              review_title: rating.review_title,
              review: rating.review,
              date: rating.date
            };
            return tmp;
          });
        },
        error: (error: any) => {
          alert(error.message);
        },
      }
    );
    console.log(this.ratings);
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

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.appComponent.logout();
  }

  public onOpenModal(mode: string,rating : RatingUser | null): void {

    let addModal: HTMLElement | null = document.getElementById('addModal');
    let deleteModal:HTMLElement | null =  document.getElementById("deleteModal");
      if (mode === "add") {
      addModal?.style.setProperty('display', 'inline-flex');
    }
    if(mode === "delete")
    {

    }

  }

  onCloseModal(mode: string) {
    let addModal: HTMLElement | null = document.getElementById('addModal');
    if (mode === "add") {
      addModal?.style.setProperty('display', 'none');
    }
  }

  onDeleteRating(ratingId: number) {

  }

  onAddRating(addForm: NgForm) {
    let rating: Rating = addForm.value;
    const datepipe: DatePipe = new DatePipe('en-US');
    let now = datepipe.transform(Date.now(), 'YYYY-MM-dd');
    if (now != null) {
      rating.date = now;
    }

    if (this.bookId != null) {
      rating.book_id = this.bookId;
    }

    let userId = this.accountService.getId();
    rating.user_id = Number(userId);

    console.log(rating);
    this.ratingService.addRating(rating).subscribe({
      next: (response: Rating) => {
        console.log(response);
        this.getRatings();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  // getUsername(userId:number) : string | null
  // {
  //   return this.ratingService.getUsername(userId);
  // }
}
