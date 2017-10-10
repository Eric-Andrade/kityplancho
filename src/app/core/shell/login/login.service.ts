import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Empleados } from '../../../empleados/empleados';
import { global } from '../../../global';

@Injectable()
export class LoginService {
      public local: string;
      public url: string;
      public prueba: string;
      public identity;
      public token;
      private isUserLoggedIn;
      public password;
      public username;
      public user;

    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
        this.isUserLoggedIn = false;
    }

    // public login(user:Empleados){

    //   let body = new URLSearchParams();
    //   body.set('EEMAIL',user.EEMAIL);
    //   body.set('EPASSWORD',user.EPASSWORD);
    //   // this.setUserLoggedIn();
    //   const options = new RequestOptions({
    //     responseType: ResponseContentType.Json,
    //     withCredentials: false
    //   });

    //   return this._http.post(this.url + `empleados/admin?${body}`, JSON.stringify({body: body}), options)
    //    .map( res => res.json());

    // }

    public login(user:Empleados){
      
            let body = new URLSearchParams();
            body.set('EEMAIL',user.EEMAIL);
            body.set('EPASSWORD',user.EPASSWORD);
            // this.setUserLoggedIn();
            console.log('body login');
            console.log(body)
             return this._http.post(this.url + `empleados/admin?${body}`, body, {headers : this.getHeaders()})
             .map( res => res.json());
      
          }
      

    setUserLoggedIn() {
    	this.isUserLoggedIn = true;
    }

    getUserLoggedIn() {
    	return this.isUserLoggedIn;
    }

    logout(){
      this.username = null;
      this.password = null;
      localStorage.clear();
    }

    storedUserData(username, password){
      setTimeout(()=>{
        if(!username && !password){
        return false;
        }
        else{
          localStorage.setItem('username', JSON.stringify(username));
          localStorage.setItem('password', JSON.stringify(password));
          // this.user = user;
          // this.setUserLoggedIn();
          // console.log('User');
          // console.log(this.user);
          console.log('isUserLoggedIn');
          console.log(this.isUserLoggedIn);

        }
      },1000)

    }

    // getIdentity(){
    //   // let identity = JSON.parse(localStorage.getItem('Empleado'));
    //   let identity = localStorage.getItem('Empleado');
    //   if(identity != "undefined"){
    //     this.identity = identity;
    //   }else{
    //     this.identity = null;
    //   }

    //   return this.identity
    // }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        headers.append('X-Requested-With','XMLHttpRequest');
        headers.append('cache-control','no-cache');
        headers.append('status','OK');
        return headers;
      }
}
