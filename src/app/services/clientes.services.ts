import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Clientes } from '../clientes/clientes';

@Injectable()

export class ClientesService {
    public local: string;
    public url: string;

    constructor(private _http: Http) {
        this.local = 'http://localhost:8080/kityplancho_api/api/procesos/';
        this.url = 'http://kityplanchoapi.mybluemix.net/api/v1/';
    }

    getClientes() {
        return this._http.get(this.url + 'getclientes')
          .map(res => res.json());
    }

    getCliente(id:string) {
        return this._http.get(this.url + 'getcliente')
          .map(res => res.json());
    }

    postCliente(cliente: Clientes){
        let bodypost = JSON.stringify(cliente);
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.post(this.url+'clientes',bodypost,{headers:headers})
            .map(res => res.json())
            .catch((err:Response)=> Observable.throw(err.json()));
    }
}
