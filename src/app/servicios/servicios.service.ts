import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, ResponseContentType, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IServicios, Servicios, SPone } from './servicios';
import { global } from '../global';

@Injectable()

export class ServiciosService {
    public url: string;
    public local: string;

    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
    }

    getservicios(){
      return this._http.get(this.url + 'servicios')
            .map(res => res.json());
    }

    getallsp() {
        return this._http.get(this.url + 'dedicados/getallsp')
            .map(res => res.json());
    }

    getServiciosActivos() {
        return this._http.get(this.url + 'servicios/getallactivos')
            .map(res => res.json());
    }

    getServicio(id: string) {
        return this._http.get(this.url + 'servicios/getservicio?id=' + id)
          .map(res => res.json());
    }

     postServicio(servicio: IServicios) {
      let body = new URLSearchParams();
      body.set('SERVNOMBRE', servicio.SERVNOMBRE);
      body.set('SERVACTIVO', servicio.SERVACTIVO);
      body.set('IDSUCURSAL', servicio.IDSUCURSAL.toString());
        console.log('Servicio body');
        console.log(body);
        console.log(servicio);

        const options = new RequestOptions({
          responseType: ResponseContentType.Json,
          withCredentials: false
        });

      return this._http.post(this.url + `servicios?${body}`, JSON.stringify({body: body}), options)
      .map((response: Response) => {
        JSON.stringify(response);
      });
    }

     getlastservicio() {
        return this._http.get(this.url + 'servicios/getlastservicio')
            .map(res => res.json());
    }

    postSP(servicios: SPone){
      let body = new URLSearchParams();
      body.set('IDPRENDAS',servicios.IDPRENDAS.toString());
      body.set('IDSERVICIO',servicios.IDSERVICIO.toString());
      body.set('SPCOSTO',servicios.SPCOSTO.toString());
      body.set('SPDESCUENTO',servicios.SPDESCUENTO.toString());
        console.log('Servicio body');
        console.log(body);
        console.log(servicios);
        const options = new RequestOptions({
          responseType: ResponseContentType.Json,
          withCredentials: false
        });

      return this._http.post(this.url + `serviciosprendas?${body}`, JSON.stringify({body: body}), options)
      .map((response:Response)=>{
        JSON.stringify(response);
      });
    }

    putServicio(servicio: IServicios){
      let body = new URLSearchParams();
          body.set('ID',servicio.ID.toString());
          body.set('SERVNOMBRE',servicio.SERVNOMBRE);
          body.set('SERVIACTIVO',servicio.SERVACTIVO);
          body.set('IDSUCURSAL',servicio.IDSUCURSAL.toString());
            console.log('Servicio body');

            const options = new RequestOptions({
              responseType: ResponseContentType.Json,
              withCredentials: false
            });

          return this._http.put(this.url + `servicios?${body}`, JSON.stringify({body: body}), options)
          .map((response:Response)=>{
            JSON.stringify(response);
          });
    }

    eliminarsp(servicio){
 let body = new URLSearchParams();
      body.set('ID', servicio.toString());

      const options = new RequestOptions({
        responseType: ResponseContentType.Json,
        withCredentials: false
      });
      return this._http.delete(this.url + `serviciosprendas?${body}`, options)
      .map((response:Response) => {
        JSON.stringify(response);
      });
    }

    getSP(id: string) {
        return this._http.post(this.url + 'dedicados/servicioprendas?id='+ id, '', {headers : this.getHeaders()})
          .map(res => res.json());
    }

    getoneSP(id: string) {
        return this._http.get(this.url + 'serviciosprendas/getserviciosprenda?id='+id)
          .map(res => res.json());
    }

    putoneSP(sp: SPone){
      let body = new URLSearchParams();
          body.set('IDSP', sp.IDSP.toString());
          body.set('IDSERVICIO', sp.IDSERVICIO.toString());
          body.set('IDPRENDAS', sp.IDPRENDAS.toString());
          body.set('SPCOSTO', sp.SPCOSTO.toString());
          body.set('SPDESCUENTO', sp.SPDESCUENTO.toString());
            console.log('Servicio body');

            const options = new RequestOptions({
              responseType: ResponseContentType.Json,
              withCredentials: false
            });

          return this._http.put(this.url + `serviciosprendas?${body}`, JSON.stringify({body: body}), options)
          .map((response: Response) => {
            JSON.stringify(response);
          });

    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Requested-With', 'XMLHttpRequest');
        headers.append('cache-control', 'no-cache');
        headers.append('status', 'OK');
        return headers;
      }

}
