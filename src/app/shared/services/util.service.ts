import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private token: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public baseUrl = 'eblog-api.encentrals.com/api/';

  constructor() {
  }

  setUserObject(data) {
    localStorage.setItem('userObj', JSON.stringify(data));
  }

  getUserObject() {
    if (localStorage.getItem('userObj') !== undefined && localStorage.getItem('userObj') !== null) {
      return JSON.parse(localStorage.getItem('userObj'));
    }
    return null;
  }

  setToken(data) {
    localStorage.setItem('token', JSON.stringify(data));
    this.token.next(data);
  }

  getToken() {
    let token;
    token = this.token.value;
    if ((localStorage.getItem('token') !== undefined) && (localStorage.getItem('token') !== null)) {
      token = localStorage.getItem('token').split('"')[1];
    }
    return token;
  }

}
