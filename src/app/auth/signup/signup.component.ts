import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/core/services/util.service';
import { CrudService } from 'src/app/core/services/crud.service';
import { Router } from '@angular/router';
import UserResponse from 'src/app/core/models/user';

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

  constructor(private util: UtilService, private crud: CrudService, private router: Router) {
    if (this.util.getUserObject() !== null) {
      this.router.navigate(['/']);
    }
    this.emailPattern = this.util.emailValidator;
    this.usernamePattern = this.util.usernameValidator;
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

    this.crud.postResource(url, data)
      .subscribe((res: UserResponse) => {
        if (Object.keys(res).length === 0 && res.constructor === Object) {
          this.loading = false;
          return;
        }
        this.loading = false; this.router.navigateByUrl('/login');
      });
  }

}
