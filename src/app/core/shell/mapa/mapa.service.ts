import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { global } from '../../../global';
@Injectable()
export class MapaService {
   public local: string;
   public url: string;

  constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
   }

 getcoordenasr( ) {
        return this._http.get(this.url + 'rutero')
          .map(res => res.json());
    }

  getcoordenase( ) {
        return this._http.get(this.url + 'rutero?idcliente=1')
          .map(res => res.json());
    }

  getubicacionrutero( ) {
        return this._http.get(this.url + 'getubicacionrutero')
          .map(res => res.json());
    }
}
