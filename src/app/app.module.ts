import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './account/component/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './account/component/register/register.component';
import { StuffListComponent } from './users/components/stuff-list/stuff-list.component';
import { UserListComponent } from './users/components/user-list/user-list.component';
import { BookComponent } from './book/book.component';
import { BookService } from './book/book.service';
import { UserService } from './users/services/user.service';
import { RouterModule } from '@angular/router';
import { AccountService } from './account/component/services/account.service';
import {RatingComponent} from "./rating/rating.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BorrowsComponent} from "./borrows/borrows.component";


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    StuffListComponent,
    BookComponent,
    RatingComponent,
    BorrowsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [BookService, UserService, AccountService],
  bootstrap: [AppComponent],
})
export class AppModule {}
