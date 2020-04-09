import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/shared/services/util.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  emailPattern: string;
  usernamePattern: string;
  loading: boolean;

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private util: UtilService, private crud: CrudService, private router: Router) {
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
        username: this.form.controls.username.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value
      }
    };

    this.crud.postResource(url, data)
      .subscribe(res => { this.loading = false; this.router.navigateByUrl('/login'); }, e => { this.loading = false; console.log(e); });
  }

}
