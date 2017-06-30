import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginService } from './login.service';

 export var username:string = localStorage.getItem('username');
 export var password:string = localStorage.getItem('password');

@Injectable()
export class AuthguardGuard implements CanActivate {

  redirectUrl;
  constructor(
    private authService: LoginService,
    private router: Router
  ) { }

  // Function to check if user is authorized to view route
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    // Check if user is logge din
    if (username && password) {
      console.log('Valor recibido true');

      return true; // Return true: User is allowed to view route
    } else {
          console.log('Valor recibido false else');
          this.router.navigate(['/']); // Return error and route to login page
           return false; // Return false: user not authorized to view page
       }
  }
}
