import {Component, OnInit} from '@angular/core';
import {Book} from './book';
import {BookService} from './book.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {AccountService} from '../account/component/services/account.service';
import {AppRoutingModule} from '../app-routing.module';
import {APIEndpointURLs} from '../api-endpoint-urls';
import {BorrowsService} from "../borrows/borrows.service";
import {Borrows} from "../borrows/borrows";

@Component({
  selector: 'app-root',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  public books: Book[] | undefined;
  public editBook: Book | undefined;
  public deleteBook: Book | undefined;
  public borrowBook: Book | undefined;
  public isLoggedIn: boolean | undefined;
  public firstName: String | null;
  public role: String | null;
  public returnDate: Date | undefined;
  showOtherInput: boolean = false;
  otherOption: string = '';
  categories: string[] | undefined = [
    'Fiction',
    'Non-fiction',
    'Mystery',
    'Science Fiction (Sci-Fi)',
    'Fantasy',
    'Romance',
    'Historical Fiction',
    'Biography',
    'Autobiography',
    'Business',
    'Science',
    'History',
    'Thriller',
    'Horror',
    "Children's Books",
    'Young Adult (YA)',
    'Poetry',
    'Travel',
    'Philosophy',
  ];

  constructor(
    private bookService: BookService,
    private appComponent: AppComponent,
    private accountService: AccountService,
    private router: Router,
    private borrowService: BorrowsService
  ) {
    this.isLoggedIn = accountService.isLoggedIn();
    this.firstName = accountService.getFirstName();
    this.role = accountService.getRole();
  }

  logout() {
    this.appComponent.logout();
  }

  login() {
    this.router.navigate(['/login']);
  }

  goToUsersPage() {
    this.router.navigate(['/users']);
  }

  ngOnInit() {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (value: Book[]) => {
        this.books = value;
        console.log(this.books);
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }

  public onAddBook(addForm: NgForm): void {
    this.bookService.addBooks(addForm.value).subscribe({
      next: (response: Book) => {
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateBook(Book: Book): void {
    this.bookService.updateBooks(Book).subscribe({
      next: (response: Book[]) => {
        console.log(response);
        this.getBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteBook(BookId: number): void {
    this.bookService.deleteBooks(BookId).subscribe({
      next: () => {
        this.getBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public searchBooks(key: string): void {
    const results: Book[] = [];
    for (const book of this.books!) {
      if (
        (book.title &&
          book.title.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (book.subtitle &&
          book.subtitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (book.publishingHouse &&
          book.publishingHouse.toLowerCase().indexOf(key.toLowerCase()) !==
          -1) ||
        (book.author &&
          book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      ) {
        results.push(book);
      }
    }
    this.books = results;
    if (!key) {
      this.getBooks();
    } else if (results.length === 0) {
    }
  }

  public onOpenModal(mode: string, book?: Book): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    if (mode === 'view') {
      if(!book?.available)
    {
      let borrow:Borrows;
      this.borrowService.getSoonestReturnForBook(book?.id).subscribe(
        value => {borrow=value; this.returnDate = borrow.returnDate;}
      );
    }
      this.borrowBook = book;
      console.log(book);
      let modal = document.getElementById("borrowModal");
      modal?.style.setProperty("display", "block");
    }
    else
    {
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-bs-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-bs-target', '#addBookModal');
      }
      if (mode === 'edit') {
        this.editBook = book;
        button.setAttribute('data-bs-target', '#updateBookModal');
      }
      if (mode === 'delete') {
        this.deleteBook = book;

        button.setAttribute('data-bs-target', '#deleteBookModal');
      }
      container.appendChild(button);
      button.click();
    }
  }

  onCloseModal(mode: string) {
    if (mode === 'view') {
      let modal = document.getElementById('borrowModal');
      modal?.style.setProperty("display", "none");
    }
    this.returnDate = undefined;
  }

  onOptionChange(event: any) {
    const selectedOption = event.target.value;
    if (selectedOption === 'Other') {
      this.showOtherInput = true;
    } else {
      this.showOtherInput = false;
      this.otherOption = '';
    }
  }
}
