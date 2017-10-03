import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Pedidos } from './pedidos';
import { IPedido, IDetallePedido } from '../pedido/pedido';
import { global } from '../../../global';

@Injectable()

export class PedidosService {
    public local: string;
    public url: string;

    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
    }

    getpdp() {
        return this._http.get(this.url + 'dedicados/getpdp')
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

    sumaencola() {
        return this._http.get(this.url + 'sumaencola')
            .map(res => res.json());
    }

    getpedidossec() {
        return this._http.get(this.url + 'getpdpencola')
            .map(res => res.json());
    }

    putPedido(pedido: IPedido){
    let body = new URLSearchParams();
        body.set('IDPEDIDO', pedido.IDPEDIDO.toString());
        body.set('PPRECIOTOTAL', pedido.PPRECIOTOTAL.toString());
        body.set('PSTATUS', pedido.PSTATUS);
        body.set('PPAGADO', pedido.PPAGADO);
        body.set('PFORMA', pedido.PFORMA);
        body.set('PDIRECCIONR', pedido.PDIRECCIONR);
        body.set('COORDENADASR', pedido.COORDENADASR);
        body.set('PDIRECCIONE', pedido.PDIRECCIONE);
        body.set('COORDENADASE', pedido.COORDENADASE);
        body.set('IDCLIENTE', pedido.IDCLIENTE.toString());
            console.log('Datos service');
            console.log(body);
       return this._http.post(this.url + 'updatepedido', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        JSON.stringify(response);
      });

    }

    putDetallePedido(detallepedido: IDetallePedido){
    let body = new URLSearchParams();
        body.set('IDDP', detallepedido.IDDP.toString());
        body.set('DP_CANTIDADPRENDAS', detallepedido.DPCANTIDADPRENDAS.toString());
        body.set('IDSP', detallepedido.IDSP.toString());
        body.set('IDPEDIDO', detallepedido.IDPEDIDO.toString());
        body.set('DP_COSTOPEDIDO', detallepedido.DPCOSTOPEDIDO.toString());

       return this._http.post(this.url + 'updatedetallepedido', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        JSON.stringify(response);
      });
    }

    deletecarrito(id){
      let body = new URLSearchParams();
          body.set('IDDP',id.toString());
          console.log('Datos service');
          console.log(body);
          return this._http.post(this.url + 'deletePrendaCarrito', body, {headers : this.getHeaders()})
                .map((response:Response)=>{
                  JSON.stringify(response);
                });
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
