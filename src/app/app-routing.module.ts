import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './account/component/services/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/component/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './account/component/register/register.component';
import { StuffListComponent } from './users/components/stuff-list/stuff-list.component';
import { UserListComponent } from './users/components/user-list/user-list.component';
import { BookComponent } from './book/book.component';
import {RatingComponent} from "./rating/rating.component";
import {BorrowsComponent} from "./borrows/borrows.component";

const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stuff', component: StuffListComponent, canActivate: [AuthGuard] },
  { path: 'book', component: BookComponent },
  { path: 'reviews/:id', component: RatingComponent},
  { path: 'borrow/:id', component: BorrowsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
