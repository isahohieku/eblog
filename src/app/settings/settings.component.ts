import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilService } from '../core/services/util.service';
import UserResponse, { User } from '../core/models/user';
import { NgForm } from '@angular/forms';
import { CrudService } from '../core/services/crud.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userObj: User;
  username: string;
  password = '';
  email: string;
  bio: string;
  image: string;
  token: string;
  loading: boolean;

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private util: UtilService, private crud: CrudService) { }

  ngOnInit() {
    this.getUserObject();
    this.username = this.userObj.username;
    this.email = this.userObj.email;
    this.bio = this.userObj.bio;
    this.token = this.userObj.token;
    this.image = this.userObj.image;
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
  }

  updateData() {
    if (this.form.invalid) {
      return;
    }

    this.userObj.bio = this.bio;
    this.userObj.image = this.image;

    const email = this.userObj.email;

    delete this.userObj.email;

    const user = { ...this.userObj, password: this.password };

    if (!this.password) {
      delete user.password;
    }

    const url = 'user';
    const data = { user };

    this.loading = true;
    this.crud.updateResource(url, data)
      .subscribe((res: UserResponse) => {
        this.userObj = res.user;
        this.userObj.email = email;
        this.util.setUserObject(this.userObj);
        this.loading = false;
      }, e => { this.loading = false; console.log(e); });
  }

}
