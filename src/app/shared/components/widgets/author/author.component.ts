import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})

export class AuthorComponent implements OnInit, OnChanges {

  @Input() author: User;
  username = 'Isah Ohieku';
  userAvatar = 'assets/img/avatar-icon.jpg';
  // tslint:disable-next-line:max-line-length
  bio = 'Skilled and Energetic, ready to consistently deliver technological gain. Able to deliver under pressure. Known for identifying problems and providing leadership needed to develop and provide possible solutions. Excellent communication, organization and relationship skills. Result oriented, very eager to be part of any organization in need of top-level administrative and technological support.';
  constructor() {
    if (this.author) {
      this.username = this.author.username;
      if (this.author.bio !== '') {
        this.bio = this.author.bio;
      }

      if (this.author.image !== '') {
        this.userAvatar = this.author.image;
      }
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.author.currentValue) {
      this.author = changes.author.currentValue;
      this.username = this.author.username;
      if (this.author.bio !== '') {
        this.bio = this.author.bio;
      }

      if (this.author.image !== '') {
        this.userAvatar = this.author.image;
      }
    }
  }

}
