import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { CrudService } from 'src/app/core/services/crud.service';
import ProfileResponse from 'src/app/core/models/profile';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  @Input() user: User;
  followLoading: boolean;
  constructor(private crud: CrudService) { }

  ngOnInit() { }

  follow() {
    const url = `profiles/${this.user.username}/follow`;
    const data = {
      profile: this.user
    };

    this.followLoading = true;

    if (this.user.following) {
      this.crud.deleteResource(url)
        .subscribe((res: ProfileResponse) => {
          console.log(res);
          this.user = res.profile;
          this.followLoading = false;
        }, e => { this.followLoading = false; console.log(e); });
      return;
    }

    this.crud.postResource(url, data)
      .subscribe((res: ProfileResponse) => {
        console.log(res);
        this.user = res.profile;
        this.followLoading = false;
      }, e => { this.followLoading = false; console.log(e); });

  }

}
