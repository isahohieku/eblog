import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import UserResponse, { User } from 'src/app/core/models/user';
import { CrudService } from 'src/app/core/services/crud.service';
import ProfileResponse from 'src/app/core/models/profile';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnChanges {
  @Input() user: User;
  followLoading: boolean;
  userObj: User;
  userAvatar = 'assets/img/avatar-icon.jpg';
  updateLoading: boolean;
  // tslint:disable-next-line:max-line-length
  bio = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas provident cum possimus illum neque dolor suscipit ab, aut ex laboriosam. At animi consequuntur nisi magni nemo, doloremque voluptatum aliquid voluptatibus.';
  constructor(private crud: CrudService, private util: UtilService) { }

  ngOnInit() {
    this.getUserObject();
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
    if ((this.userObj === null) && (this.userObj.username === this.user.username) && (this.userObj.image !== '')) {
      if (this.user.image !== '') {
        this.userAvatar = this.userObj.image;
      }
      if (this.bio !== '') {
        this.bio = this.userObj.bio;
      }
    }

    if (this.user.image) {
      if (this.user.image !== '') {
        this.userAvatar = this.user.image;
      }
      if (this.bio !== '') {
        this.bio = this.userObj.bio;
      }
    }
  }

  follow() {
    const url = `profiles/${this.user.username}/follow`;
    const data = {
      profile: this.user
    };

    this.followLoading = true;

    if (this.user.following) {
      this.crud.deleteResource(url)
        .subscribe((res: ProfileResponse) => {
          if (Object.keys(res).length === 0 && res.constructor === Object) {
            return;
          }
          this.user = res.profile;
          this.followLoading = false;
        });
      return;
    }

    this.crud.postResource(url, data)
      .subscribe((res: ProfileResponse) => {
        if (Object.keys(res).length === 0 && res.constructor === Object) {
          return;
        }
        this.user = res.profile;
        this.followLoading = false;
      });

  }

  uploaded(image) {
    this.userObj.image = image;
    const url = 'user';
    const email = this.userObj.email;

    delete this.userObj.email;

    const data = {
      user: this.userObj
    };

    this.updateLoading = true;
    this.crud.updateResource(url, data)
      .subscribe((res: UserResponse) => {
        if (Object.keys(res).length === 0 && res.constructor === Object) {
          this.updateLoading = false;
          return;
        }
        this.userObj.email = email;
        this.util.setUserObject(this.userObj);
        this.updateLoading = false;
      });
  }

  convertedImage(e) {
    this.userAvatar = e;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user.currentValue) {
      this.user = changes.user.currentValue;
      if (this.user.image !== '') {
        this.userAvatar = this.user.image;
      }
      if (this.user.bio !== '') {
        this.bio = this.user.bio;
      }
    }
  }

}
