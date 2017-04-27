import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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

    postCliente(cliente: Clientes) {
      console.log('Saving cliente ' + JSON.stringify(cliente));
      // let json = JSON.stringify(cliente);
      //let params = cliente;
      //let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
      return this._http.post(this.url + 'clientes', JSON.stringify(cliente), {headers : this.getHeaders()})
        .map(res => res.json());;
    }

   private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('X-Requested-With','XMLHttpRequest');
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
