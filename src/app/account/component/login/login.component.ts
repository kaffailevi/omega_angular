import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Component } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isManager: boolean | undefined;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
      this.accountService
        .login(this.f.email.value as string, this.f.password.value as string)
        .subscribe((result) => {
          console.log("itt vok");
          if (result) {
            this.router.navigate(['/book']);
            
            this.showSnackbar("Login successful");
          }

        },
          (error) => {
            //console.log(error.status);
            this.showSnackbar("Invalid email or password");
          }
        );
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
