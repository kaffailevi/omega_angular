import {Component} from '@angular/core';
import {Borrows} from './borrows';
import {BorrowsService} from './borrows.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {RatingService} from "../rating/rating.service";
import {AppComponent} from "../app.component";
import {AccountService} from "../account/component/services/account.service";
import {Book} from "../book/book";

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
  styleUrls: ['./borrows.component.css']
})
export class BorrowsComponent {

  public borrows: Borrows[] | undefined;
  public deleteBorrows: Borrows | undefined;
  public firstName: string | null;
  public isLoggedIn:boolean | undefined;
  public role : string | null;
  public bookId : number | undefined;
  public book : Book | undefined;

  constructor(private borrowsService: BorrowsService,
              private router : Router,
              private activeRoute: ActivatedRoute,
              private ratingService: RatingService,
              private route: ActivatedRoute,
              private appComponent: AppComponent,
              private accountService: AccountService) {

    this.isLoggedIn = accountService.isLoggedIn();
    this.firstName = accountService.getFirstName();
    this.role = accountService.getRole();
    activeRoute.params.subscribe(
      params => {
        this.bookId = params['id'];
      }
    );
    this.borrowsService.getBook(this.bookId).subscribe(
      {
        next: value => {
          this.book = value;
        },
        error:(err:HttpErrorResponse)=> {
          alert(err.message);
    }
      }
    )

  }

  ngOnInit() {
    this.getBorrows();

  }

  public getBorrows(): void {
    this.borrowsService.getBorrows().subscribe({
      next: (value: Borrows[]) => {
        this.borrows = value;
        console.log(this.borrows);
      },
      error: (error: any) => {
        alert(error.message);
      }
    });

  }

  public onDeleteBorrows(BorrwowId: number): void {
    this.borrowsService.deleteBorrow(BorrwowId).subscribe({
      next: () => {
        console.log("Deletion successful");
        this.getBorrows();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.appComponent.logout();
  }


}
