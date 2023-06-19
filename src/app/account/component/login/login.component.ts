import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountService } from '../services/account.service';
import { Component } from '@angular/core';

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
    private accountService: AccountService
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
        if (result) {
          this.accountService.getUserByEmail(this.f.email.value as string).subscribe((user) => {
            this.isManager = user.isManager;
            this.router.navigate(['/book'], { queryParams: { isManager: user.isManager } });
          });
        }
      });
  }
}
