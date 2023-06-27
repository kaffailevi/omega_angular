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
import {RatingEnum} from "./rating.enum";
import {UserService} from "../users/services/user.service";
import {User} from "../users/models/user.model";


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  public ratings: RatingUser[];
  public bookId: number | undefined;
  public book: Book | undefined;
  public isLoggedIn: boolean | undefined;
  public role: string | null;
  public firstName: string | null;
  private deleteRating: RatingUser | null;
  protected static readonly ratingEnum: RatingEnum;

  constructor(private activeRoute: ActivatedRoute,
              private ratingService: RatingService,
              private userService: UserService,
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
    this.deleteRating = null;
    this.ratings = [];
  }


  public getRatings(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.ratingService.getRatingsByBookId(this.bookId).subscribe(
          ratings => {
            this.ratings = ratings.map(
              (rating, index, array) => {
                let user : User | undefined =  users.find(user => user.id === rating.user_id);
                return {
                  id: rating.id,
                  user_id:rating.user_id,
                  user_name : ( user?.firstName + ' ' + user?.lastName),
                  rating:rating.rating,
                  review_title : rating.review_title,
                  review: rating.review,
                  date: rating.date
                }
              }
            )
          }
        );
      }
    );


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

  public onOpenModal(mode: string, rating: RatingUser | null): void {

    let addModal: HTMLElement | null = document.getElementById('addModal');
    let deleteModal: HTMLElement | null = document.getElementById("deleteModal");
    if (mode === "add") {
      addModal?.style.setProperty('display', 'inline-flex');
    }
    if (mode === "delete") {
      deleteModal?.style.setProperty('display', 'inline-flex');
      this.deleteRating = rating;
    }


  }

  onCloseModal(mode: string) {
    let addModal: HTMLElement | null = document.getElementById('addModal');
    let deleteModal: HTMLElement | null = document.getElementById('deleteModal');
    if (mode === "add") {
      addModal?.style.setProperty('display', 'none');
    }

    if (mode === "delete") {
      deleteModal?.style.setProperty('display', 'none');
    }
  }

  onDeleteRating() {
    if (this.deleteRating != null) {
      this.ratingService.deleteById(this.deleteRating?.id)?.subscribe(
        {
          next: response => {
            console.log(response);
            this.getRatings();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          }
        }
      );
    }
    this.onCloseModal("delete");
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
    this.onCloseModal('add');
  }


  protected readonly RatingEnum = RatingEnum;
}
