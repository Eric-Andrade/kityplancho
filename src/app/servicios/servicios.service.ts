import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IServicios, Servicios } from './servicios';
import { global } from '../global';

@Injectable()

export class ServiciosService {
    public url: string;
    public local: string;

    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
    }

     getallsp() {
        return this._http.get(this.url + 'getallsp')
            .map(res => res.json());
    }

     getServiciosActivos() {
        return this._http.get(this.url + 'getallServiciosNombres')
            .map(res => res.json());
    }

    getServicio(id: string) {
        return this._http.get(this.url + 'getservicio?id='+id)
          .map(res => res.json());
    }

     postServicio(servicio: IServicios){
      let body = new URLSearchParams();
      body.set('SERVNOMBRE',servicio.SERVNOMBRE);
      body.set('SERVACTIVO',servicio.SERVACTIVO);
      body.set('IDSUCURSAL',servicio.IDSUCURSAL.toString());
        console.log('Servicio body');
        console.log(body);
        console.log(servicio);

      return this._http.post(this.url + 'postservicio', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        JSON.stringify(response);
      });
    }

     getlastservicio() {
        return this._http.get(this.url + 'getlastservicio')
            .map(res => res.json());
    }

    postSP(servicios: Servicios){
      let body = new URLSearchParams();
      body.set('IDPRENDAS',servicios.IDPRENDAS.toString());
      body.set('IDSERVICIO',servicios.IDSERVICIO.toString());
      body.set('SPCOSTO',servicios.SPCOSTO.toString());
      body.set('SPDESCUENTO',servicios.SPDESCUENTO.toString());
        console.log('Servicio body');
        console.log(body);
        console.log(servicios);

      return this._http.post(this.url + 'postserviciosprenda', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        JSON.stringify(response);
      });
    }

    putServicio(servicio: IServicios){
      let body = new URLSearchParams();
          body.set('IDSERVICIO',servicio.IDSERVICIO.toString());
          body.set('SERVNOMBRE',servicio.SERVNOMBRE);
          body.set('SERVACTIVO',servicio.SERVACTIVO);
          body.set('IDSUCURSAL',servicio.IDSUCURSAL.toString());
            console.log('Servicio body');

          return this._http.post(this.url + 'updateservicio', body, {headers : this.getHeaders()})
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
