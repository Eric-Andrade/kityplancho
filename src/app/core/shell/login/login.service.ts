import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Empleados } from '../../../empleados/empleados';
import { global } from '../../../global';

@Injectable()
export class LoginService {
      public local: string;
      public url: string;
      public prueba: string;

    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
    }

    public login(user, gethash = null){
      let body = new URLSearchParams();
      body.set('EEMAIL',user.EEMAIL);
      body.set('EPASSWORD',user.EPASSWORD);

      if(gethash != null){
        user.gethash = gethash;
      }

      // let json = JSON.stringify(user);
      // let body = json;
       return this._http.post(this.url + 'ingresoadmin', body, {headers : this.getHeaders()})
          .map(res => res.json());
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        headers.append('X-Requested-With','XMLHttpRequest');
        headers.append('cache-control','no-cache');
        headers.append('status','OK');
        return headers;
      }
}
