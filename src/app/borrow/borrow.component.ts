import {Borrow} from "./borrow";
import {Book} from "../book/book";
import {ActivatedRoute, Router} from "@angular/router";
import {BorrowService} from "./borrow.service";
import {AppComponent} from "../app.component";
import {AccountService} from "../account/component/services/account.service";
import {Component} from "@angular/core";

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent{
  public bookId: number | undefined;
  public book: Book | undefined;
  public isLoggedIn: boolean | undefined;
  public role: string | null;
  public firstName: String | null;
  constructor(private activeRoute: ActivatedRoute,
              private route: ActivatedRoute,
              private borrowService: BorrowService,
              private appComponent: AppComponent,
              private accountService: AccountService,
              private router:Router){
    activeRoute.params.subscribe(
      params => {
        this.bookId = params['id'];
      });
    borrowService.getBook(this.bookId).subscribe(
      {
        next: (value: Book) => this.book = value
      }
    )
    console.log(this.book);
    this.isLoggedIn = accountService.isLoggedIn();
    this.firstName = accountService.getFirstName();
    this.role = accountService.getRole();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.appComponent.logout();
  }

  public onOpenModal(mode: string, borrow:  | null): void {

    let addModal: HTMLElement | null = document.getElementById('addModal');
    if (mode === "add") {
      addModal?.style.setProperty('display', 'inline-flex');
    }
  }
}
