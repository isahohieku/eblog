import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
declare var $: any;

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

  setUserObject(data: User): void {
    localStorage.setItem('userObj', JSON.stringify(data));
  }

  getUserObject(): User | null {
    if (localStorage.getItem('userObj')) {
      return JSON.parse(localStorage.getItem('userObj')) as User;
    }
    return null;
  }

  setToken(data: string): void {
    localStorage.setItem('token', data);
    this.token.next(data);
  }

  getToken(): string {
    let token;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    return token;
  }

}
