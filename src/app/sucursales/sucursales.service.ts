import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Sucursales, IPedidos } from './sucursales';

@Injectable()
@Injectable()
export class SucursalesService {
    public url: string;
    public local: string;

    constructor(private _http: Http) {
        this.local = 'http://localhost:8080/kityplancho_api/api/procesos/';
        this.url = 'http://kityplanchoapi.mybluemix.net/api/v1/';
    }

    getSucursales() {
        return this._http.get(this.url + 'getsucursales')
         .map(res => res.json());
    }

    getSucursal(id:string) {
        return this._http.get(this.url + 'getsucursal?id='+id)
          .map( res => res.json());
    }

     postSucursal(sucursal: Sucursales){
      let body = new URLSearchParams();
      body.set('SNOMBRE',sucursal.SNOMBRE);
      body.set('SDIRECCION',sucursal.SDIRECCION);
      body.set('SEMAIL',sucursal.SEMAIL);
      body.set('STELEFONO',sucursal.STELEFONO);
      body.set('SESTADO',sucursal.SESTADO);
      body.set('SMUNICIPIO',sucursal.SMUNICIPIO);
      body.set('SLOCALIDAD',sucursal.SLOCALIDAD);
      body.set('SHORARIO',sucursal.SHORARIO);


      return this._http.post(this.url + 'postsucursales', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        console.log('Employee saved');
        JSON.stringify(response);
      });
    }

    putSucursal(sucursal: Sucursales){
        let body = new URLSearchParams();
            body.set('IDSUCURSAL',sucursal.IDSUCURSAL.toString());
            body.set('SNOMBRE',sucursal.SNOMBRE);
            body.set('SDIRECCION',sucursal.SDIRECCION);
            body.set('SEMAIL',sucursal.SEMAIL);
            body.set('STELEFONO',sucursal.STELEFONO);
            body.set('SESTADO',sucursal.SESTADO);
            body.set('SMUNICIPIO',sucursal.SMUNICIPIO);
            body.set('SLOCALIDAD',sucursal.SLOCALIDAD);
            body.set('SHORARIO',sucursal.SHORARIO);
            body.set('ACTIVO',sucursal.ACTIVO);

           return this._http.post(this.url + 'updatesucursal', body, {headers : this.getHeaders()})
          .map((response:Response)=>{
            console.log('Employee updated');
            JSON.stringify(response);
          });
        }

    getpdp() {
        return this._http.get(this.url + 'getpdp')
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
