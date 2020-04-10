import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/shared/services/util.service';
import { CrudService } from 'src/app/shared/services/crud.service';
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

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(
    private util: UtilService,
    private crud: CrudService,
    private auth: AuthService,
    private router: Router) {
    this.emailPattern = this.util.emailValidator;
  }
  ngOnInit() {
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    const url = 'users/login';
    this.loading = true;

    const data = {
      user: {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value
      }
    };

    this.crud.postResource(url, data)
      .subscribe((res: UserResponse) => {
        this.util.setToken(res.user.token);
        this.util.setUserObject(res.user);
        this.auth.setLoginStatus(true);
        this.loading = false;
        this.router.navigateByUrl('/');
      }, e => { this.loading = false; console.log(e); });
  }

}
