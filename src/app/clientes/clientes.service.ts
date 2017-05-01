import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Clientes } from './clientes';
import 'rxjs/add/operator/map';

@Injectable()


export class ClientesService {
    public local: string;
    public url: string;
    public prueba: string;
    constructor(private _http: Http) {
        this.local = 'http://localhost:8080/kityplancho_api/api/v1/';
        this.url = 'http://kityplanchoapi.mybluemix.net/api/v1/';
        this.prueba = 'http://pruebakityplancho.mybluemix.net/api/procesos/';
    }

    postCliente(cliente: Clientes){
    let body = new URLSearchParams();
    body.set('CCORREO',cliente.CCORREO);
    body.set('CCONTRASENA',cliente.CCONTRASENA);
    body.set('CNOMBRE',cliente.CNOMBRE);
    body.set('CAPELLIDOS',cliente.CAPELLIDOS);
    body.set('CTELEFONO',cliente.CTELEFONO);

      return this._http.post(this.url + 'clientes', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        console.log('Client saved');
        JSON.stringify(response);
      });
    }

   /* postCliente(cliente: Clientes) {
      console.log('Saving cliente ' + JSON.stringify(cliente));
      return this._http.post(this.url + 'clientes', cliente, {headers : this.getHeaders()})
        .map(res => res.json());
        // .map((response: Response) => {
        //     JSON.stringify(response);
        // });
    }
    */

   private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    headers.append('X-Requested-With','XMLHttpRequest');
    headers.append('cache-control','no-cache');
    headers.append('status','OK');
    return headers;
  }

    getClientes() {
        return this._http.get(this.url + 'getclientes')
          .map(res => res.json());
    }

    getCliente(id: string) {
        return this._http.get(this.url + 'getcliente?id='+id)
          .map(res => res.json());
    }

postJSON() {
var url = 'http://kityplanchoapi.mybluemix.net/api/v1/clientes';
var json = JSON.stringify({
CNOMBRE: 'Augusto',
CAPELLIDOS: 'Sotelo',
CCORREO: 'alguncorreo@correo.cl',
CCONTRASENA: 12345,
CTELEFONO:123456789
});
var headers = new Headers();
headers.append('Content-type','application/x-www-form-urlencoded');
return this._http.post(this.url+('clientes'), json, {
headers: headers
})
.map(res => res.json());
}

}
