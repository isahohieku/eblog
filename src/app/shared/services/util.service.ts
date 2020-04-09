import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private token: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public baseUrl = 'https://eblog-api.encentrals.com/api/';
  public emailValidator = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  public usernameValidator = '[a-zA-Z0-9]{4,10}$';

  constructor() {
  }

  setUserObject(data) {
    localStorage.setItem('userObj', JSON.stringify(data));
  }

  getUserObject() {
    if (localStorage.getItem('userObj')) {
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
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token').split('"')[1];
    }
    return token;
  }

}
