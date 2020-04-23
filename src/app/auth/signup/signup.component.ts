import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/core/services/util.service';
import { Router } from '@angular/router';
import UserResponse from 'src/app/core/models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  emailPattern: string;
  usernamePattern: string;
  loading: boolean;
  username = '';
  email = '';
  password = '';

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private util: UtilService, private auth: AuthService, private router: Router) {
    this.emailPattern = this.util.emailValidator;
    this.usernamePattern = this.util.usernameValidator;
    if (this.util.getUserObject() !== null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  signUp() {
    if (this.form.invalid) {
      return;
    }
    const url = 'users';
    this.loading = true;

    const data = {
      user: {
        username: this.username,
        email: this.email,
        password: this.password
      }
    };

    this.auth.signupUser(url, data)
      .subscribe((res: UserResponse) => {
        if (Object.keys(res).length === 0) {
          this.loading = false;
          return;
        }
        this.loading = false; this.router.navigateByUrl('/login');
      });
  }

}
