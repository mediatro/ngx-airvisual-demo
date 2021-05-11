import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  constructor() { }

  login(account: string, password: string){
    this.isLoggedIn = account === 'admin' && password == 'admin';
    return of(this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
