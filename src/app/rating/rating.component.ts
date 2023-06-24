import {Component} from '@angular/core';
import {Rating} from "./rating";

import {ActivatedRoute, Router} from "@angular/router";
import {RatingService} from "./rating.service";
import {Book} from "../book/book";
import {AppComponent} from "../app.component";
import {AccountService} from "../account/component/services/account.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../users/models/user.model";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  public ratings: Rating[] | undefined;
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
        next:(value:Book) => this.book = value
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

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.appComponent.logout();
  }

  public onOpenModal(mode: string): void {

    let addModal:HTMLElement | null = document.getElementById('addModal');
    if(mode === "add")
    {
      addModal?.style.setProperty('display','inline-flex');
    }

  }

  onCloseModal(mode:string)
  {
    let addModal:HTMLElement | null = document.getElementById('addModal');
    if(mode === "add")
    {
      addModal?.style.setProperty('display','none');
    }
  }

  onDeleteRating(ratingId:number)
  {

  }

  onAddRating(addForm: NgForm) {
    let rating : Rating = addForm.value;
    const datepipe: DatePipe = new DatePipe('en-US');
    let now = datepipe.transform(Date.now(), 'YYYY-MM-dd');
    if (now != null) {
      rating.date = now;
    }

    if (this.bookId != null) {
      rating.bookId = this.bookId;
    }
  console.log(this.accountService.getId())

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
}
