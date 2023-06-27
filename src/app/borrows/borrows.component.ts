import { Component } from '@angular/core';
import { Borrows } from './borrows';
import { BorrowsService } from './borrows.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../rating/rating.service';
import { AppComponent } from '../app.component';
import { AccountService } from '../account/component/services/account.service';
import { Book } from '../book/book';
import { UserService } from '../users/services/user.service';
import { BorrowsTo } from './borrows.to';
import { User } from '../users/models/user.model';

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
  styleUrls: ['./borrows.component.css'],
})
export class BorrowsComponent {
  public borrows: BorrowsTo[] | undefined;
  public deleteBorrows: Borrows | undefined;
  public firstName: string | null;
  public isLoggedIn: boolean | undefined;
  public role: string | null;
  public bookId: number | undefined;
  public book: Book | undefined;
  public users: User[] | undefined;


  constructor(
    private borrowsService: BorrowsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private appComponent: AppComponent,
    private accountService: AccountService,
    private userService: UserService
  ) {
    this.isLoggedIn = accountService.isLoggedIn();
    this.firstName = accountService.getFirstName();
    this.role = accountService.getRole();
    activeRoute.params.subscribe((params) => {
      this.bookId = params['id'];
    });
    this.borrowsService.getBook(this.bookId).subscribe({
      next: (value) => {
        this.book = value;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      },
    });
    this.userService.getAllUsers().subscribe((value) => {this.users = value;this.borrows=[];this.getBorrows();});


  }



  public getBorrows(): void {
    this.borrows = [];
    this.borrowsService.getBorrows().subscribe({
      next: (value: Borrows[]) => {
        for (let item of value) {
          let userId = item.userId;
          let bookId = item.bookId;
          let loanDate = item.loanDate;
          let returnDate = item.returnDate;
          let id = item.id;
          let user = this.users?.find((it) => {
            return it.id === item.userId;
          });

            const convertedItem: BorrowsTo = {
              id: id,
              bookId: bookId,
              userEmail: user?.email,
              userFirstname: user?.firstName,
              userLastname: user?.lastName,
              userId: userId,
              loanDate: loanDate,
              returnDate: returnDate,
              profileImg: user?.profileImage,
            };
            this.borrows?.push(convertedItem);
        }
        console.log(this.borrows);
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }

  public onDeleteBorrows(BorrwowId: number): void {
    this.borrowsService.deleteBorrow(BorrwowId).subscribe({
      next: () => {
        console.log('Deletion successful');
        this.getBorrows();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.appComponent.logout();
  }

  onOpenModal(mode: string) {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addBorrowModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddBorrow(addForm: NgForm): void {

    document.getElementById('add-borrow-form')!.click();
    let addBorrow : Borrows = addForm.value;
    if (this.bookId != null) {
      addBorrow.bookId = this.bookId;
    }
    this.borrowsService.addBorrow(addBorrow).subscribe({
      next: (response: Borrows) => {
        this.getBorrows();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
    this.getBorrows();
  }
}
