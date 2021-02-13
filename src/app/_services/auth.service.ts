import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // {1}
  

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router
  ) {}

  login(user: User){
    if (user.username !== '' && user.password !== '' ) { // {3}
      localStorage.setItem('username', user.username);
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {          
    localStorage.removeItem('username');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);                  // {4}
  }
  
}