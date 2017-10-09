import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
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
        return this._http.get(this.url + 'pedidos/getpedido?id='+id)
          .map(res => res.json());
    }

    getDetallePedidos(id: string) {
        return this._http.get(this.url + 'detallespedidos?id='+id)
          .map(res => res.json());
    }

    getDetallePedido(id: string) {
        return this._http.get(this.url + 'detallespedidos/getone?id='+id)
          .map(res => res.json());
    }

    sumaencola() {
        return this._http.get(this.url + 'dedicados/getsumacola' )
        .map(res => res.json());
    }

    getpedidossec() {
        return this._http.get(this.url + 'dedicados/getpdpencola')
            .map(res => res.json());
    }

    putPedido(pedido: IPedido){
    let body = new URLSearchParams();
        body.set('IDPEDIDO', pedido.ID.toString());
        body.set('PRECIO', pedido.PPRECIOTOTAL.toString());
        body.set('STATUS', pedido.PSTATUS);
        body.set('PAGADO', pedido.PPAGADO);
        body.set('FORMA', pedido.PFORMA);
        body.set('DIRECCION_R', pedido.PDIRECCION_R);
        body.set('COORDENADAS_R', pedido.PCOORDENADAS_R);
        body.set('DIRECCION_E', pedido.PDIRECCION_E);
        body.set('COORDENADAS_E', pedido.PCOORDENADAS_E);
        body.set('IDCLIENTE', pedido.IDCLIENTE.toString());
        const options = new RequestOptions({
            responseType: ResponseContentType.Json,
            withCredentials: false
          });
  
       return this._http.put(this.url + `pedidos?${body}`, JSON.stringify({body: body}), options)
      .map((response: Response) => {
        JSON.stringify(response);
      });

    }

    putDetallePedido(detallepedido: IDetallePedido){
    let body = new URLSearchParams();
        body.set('ID', detallepedido.ID.toString());
        body.set('CANTIDADPRENDA', detallepedido.DPCANTIDADPRENDAS.toString());
        body.set('IDSP', detallepedido.IDSP.toString());
        body.set('IDPEDIDO', detallepedido.DPIDPEDIDO.toString());
        body.set('COSTO', detallepedido.DPCOSTOPEDIDO.toString());

        const options = new RequestOptions({
            responseType: ResponseContentType.Json,
            withCredentials: false
          });
  
       return this._http.put(this.url + `detallespedidos?${body}`, JSON.stringify({body: body}), options)
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
