import { Component, OnInit } from '@angular/core';
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
  email: string;
  bio: string;
  image: string;
  loading: boolean;

  constructor(private util: UtilService, private crud: CrudService) { }

  ngOnInit() {
    this.getUserObject();
    this.username = this.userObj.username;
    this.email = this.userObj.email;
    this.bio = this.userObj.bio;
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
  }

  updateData(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userObj.bio = this.bio;
    this.userObj.image = this.image;
    delete this.userObj.token;

    const url = 'users';
    const data = { user: this.userObj };

    this.loading = true;
    this.crud.updateResource(url, data)
      .subscribe((res: UserResponse) => {
        console.log(res);
        this.loading = false;
      }, e => { this.loading = false; console.log(e); });
    console.log(this.userObj);
  }

}
