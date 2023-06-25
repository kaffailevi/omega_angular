import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AccountService } from 'src/app/account/component/services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { APIEndpointURLs } from 'src/app/api-endpoint-urls';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  //users$: Observable<User[]>;
  public users: User[] | undefined;
  public isLoggedIn: boolean | undefined;
  public firstName: String | null;
  public editUser: User | undefined;
  public deleteUser: User | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private appComponent: AppComponent,
    private accountService: AccountService
  ) {
    this.isLoggedIn = accountService.isLoggedIn();
    this.firstName = accountService.getFirstName();

    //this.users$ = this.userService.getAllUsers();
    //this.users$.pipe(tap((users) => console.log(users))); //.subscribe();
    // this.userService
    //   .getAllUsers()
    //   .pipe(tap((users) => console.log(users)))
    //   .subscribe();
  }

  public updateRole(user: User): void {
    user.isManager = !user.isManager;
    this.userService.updateUser(user).subscribe({
      next: (response: User[]) => {
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public logout(): void {
    this.appComponent.logout();
  }

  public login(): void {
    this.router.navigate(['/login']);
  }
  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (value: User[]) => {
        this.users = value;
        console.log(this.users);
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }

  public onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal(mode: string, user?: User): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-bs-target', '#deleteUserModal');
    }
    container.appendChild(button);
    button.click();
  }

  // getImage(user: User): string {
  //   const coverImage = document.getElementById('profileImage');

  //   fetch(APIEndpointURLs.profileImage + user.id)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const imageURL = URL.createObjectURL(blob);
  //       return imageURL;
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  //   return '';
  // }
}
