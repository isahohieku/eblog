import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/core/services/util.service';
import { Router } from '@angular/router';

import UserResponse from '../../core/models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailPattern: string;
  loading: boolean;

  email = '';
  password = '';

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(
    private util: UtilService,
    private auth: AuthService,
    private router: Router) {
    this.emailPattern = this.util.emailValidator;
    if (this.util.getUserObject() !== null) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {}

  login() {
    if (this.form.invalid) {
      return;
    }
    const url = 'users/login';
    this.loading = true;

    const data = {
      user: {
        email: this.email,
        password: this.password
      }
    };

    this.auth.loginUser(url, data)
      .subscribe((res: UserResponse) => {
        if (Object.keys(res).length === 0) {
          this.loading = false;
          return;
        }
        this.util.setToken(res.user.token);
        this.util.setUserObject(res.user);
        this.auth.setLoginStatus(true);
        this.loading = false;
        this.router.navigateByUrl('/');
      });
  }

}
