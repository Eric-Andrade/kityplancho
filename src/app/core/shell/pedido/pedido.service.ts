import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IPedido, IDetallePedidos, DP } from './pedido';
import { global } from '../../../global';
import 'rxjs/add/operator/map';

@Injectable()

export class PedidoService {
    public local: string;
    public url: string;
    public prueba: string;
    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
        this.prueba = 'http://pruebakityplancho.mybluemix.net/api/procesos/';
    }


    postPedido(pedido: IPedido){
       let body = new URLSearchParams();
            // body.set('PSTATUS',pedido.PSTATUS);
            body.set('DIRECCION_R',pedido.PDIRECCION_R);
            body.set('DIRECCION_E',pedido.PDIRECCION_E);
            body.set('PRECIO',pedido.PPRECIOTOTAL.toString());
            body.set('PAGADO',pedido.PPAGADO);
            body.set('FORMA', pedido.PFORMA);
            body.set('COORDENADASR',pedido.PCOORDENADAS_R);
            body.set('COORDENADASE',pedido.PCOORDENADAS_E);
            body.set('IDCLIENTE',pedido.IDCLIENTE.toString());

            const options = new RequestOptions({
              responseType: ResponseContentType.Json,
              withCredentials: false
            });
  
          // console.log('Options: ' + JSON.stringify(options));
          // console.log('Prenda body   ' + body);
  
        return this._http.post(this.url + `pedidos?${body}`, JSON.stringify({body: body}), options)
                  .map((response: Response) => {
                    JSON.stringify(response);
                  });
            // return console.log('Whop')
    }



  postDetallePedido(detallepedido: IDetallePedidos){

       let body = new URLSearchParams();
            body.set('IDSP',detallepedido.IDSP.toString());
            body.set('CANTIDAD',detallepedido.DPCANTIDADPRENDAS.toString());
            body.set('IDPEDIDO',detallepedido.DPIDPEDIDO.toString());
            body.set('COSTO',detallepedido.DPCOSTOPEDIDO.toString());
            console.log('Datos service');
            console.log(body);
            return this._http.post(this.url + 'postDetallePedido', body, {headers : this.getHeaders()})
                  .map((response:Response)=>{
                    JSON.stringify(response);
                  });
    }

    postDP(dp: DP){

       let body = new URLSearchParams();
            body.set('IDSP',dp.DPIDSP.toString());
            body.set('CANTIDADPRENDA',dp.DPCANTIDAD.toString());
            body.set('IDPEDIDO',dp.DPIDPEDIDO.toString());
            body.set('COSTO',dp.DPCOSTO.toString());
            console.log('Datos service');
            const options = new RequestOptions({
              responseType: ResponseContentType.Json,
              withCredentials: false
            });
            return this._http.post(this.url + `detallespedidos?${body}`, JSON.stringify({body: body}), options)
                  .map((response:Response)=>{
                    JSON.stringify(response);
                  });
    }

    getSumaP(id){
        let body = new URLSearchParams();
          body.set('IDPEDIDO', id);
          return this._http.get(this.url + `carrito?${body}&idcliente=1`)
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

     getlastpedido() {
        return this._http.get(this.url + 'getlastpedido')
            .map(res => res.json());
    }
}
