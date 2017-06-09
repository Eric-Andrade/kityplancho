import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Pedidos } from './pedidos';
import { global } from '../global';

@Injectable()

export class PedidosService {
    public local: string;
    public url: string;

    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
    }

    getpdp() {
        return this._http.get(this.url + 'getpdp')
            .map(res => res.json());
    }

    getPedidos( ) {
        return this._http.get(this.url + 'getpedidos')
          .map(res => res.json());
    }

    getPedido(id: string) {
        return this._http.get(this.url + 'getpedido?id='+id)
          .map(res => res.json());
    }

    getDetallePedidos(id: string) {
        return this._http.get(this.url + 'getdetallepedidos?id='+id)
          .map(res => res.json());
    }

    getDetallePedido(id: string) {
        return this._http.get(this.url + 'getdetallepedido?id='+id)
          .map(res => res.json());
    }


}
