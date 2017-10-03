import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Clientes } from './clientes';
import { global } from '../global';

import 'rxjs/add/operator/map';

@Injectable()


export class ClientesService {
      public local: string;
      public url: string;
      public prueba: string;
    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
        this.prueba = 'http://pruebakityplancho.mybluemix.net/api/procesos/';
    }

    postCliente(cliente: Clientes){
    let body = new URLSearchParams();
        body.set('CEMAIL', cliente.CEMAIL);
        body.set('CPASSWORD', cliente.CPASSWORD);
        body.set('CNOMBRE', cliente.CNOMBRE);
        body.set('CAPELLIDOS', cliente.CAPELLIDOS);
        body.set('CTELEFONO', cliente.CTELEFONO);

      return this._http.post(this.url + 'clientes', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        JSON.stringify(response);
      });
    }

    putCliente(cliente: Clientes){
    let body = new URLSearchParams();
        body.set('IDCLIENTE', cliente.ID.toString());
        body.set('CEMAIL', cliente.CEMAIL);
        body.set('CPASSWORD', cliente.CPASSWORD);
        body.set('CNOMBRE', cliente.CNOMBRE);
        body.set('CAPELLIDOS', cliente.CAPELLIDOS);
        body.set('CTELEFONO', cliente.CTELEFONO);
        body.set('ACTIVO', cliente.ACTIVO.toString());

       return this._http.post(this.url + 'updatecliente', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        JSON.stringify(response);
      });
    }

    getClientesActivos() {
        return this._http.get(this.url + 'getclientesactivos')
          .map(res => res.json());
    }
// * MVC
    getClientes() {
        return this._http.get(this.url + 'clientes')
          .map(res => res.json());
    }

    getCliente(id: string) {
        return this._http.get(this.url + 'clientes?id=' + id)
          .map(res => res.json());
    }
// * MVC
    getLastCliente() {
        return this._http.get(this.url + 'clientes/getlastcliente')
          .map(res => res.json());
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Requested-With', 'XMLHttpRequest');
        headers.append('cache-control', 'no-cache');
        headers.append('status', 'OK');
        return headers;
      }

     getMisPedidos(idcliente: string){
        return this._http.get(this.url + 'getMisPedidos?id=' + idcliente)
          .map(res => res.json());
    }

    // private handleError(error: Response | any){
    //     let erroMessage: string;
    //     if(error instanceof Response){
    //         let body = error.json || '';
    //         //let err = body.error || JSON.stringify(body);
    //         erroMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    //     }
    // }


}
