import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IServicios, IPrendas } from './servicios';
import { global } from '../global';

@Injectable()

export class ServiciosService {
    public local: string;
    public url: string;

    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;

    }


    getServicios() {
        return this._http.get(this.url + 'getservicios')
            .map(res => res.json());
    }

    getServiciosActivos() {
        return this._http.get(this.url + 'getallServiciosNombres')
            .map(res => res.json());
    }

    getallsp() {
        return this._http.get(this.url + 'getallsp')
            .map(res => res.json());
    }

    getPrendas() {
        return this._http.get(this.url + 'getprendas')
            .map(res => res.json());
    }

    postServicio(servicio: IServicios){
       let body = new URLSearchParams();
            body.set('IDSERVICIO',servicio.IDSERVICIO.toString());
            body.set('SERVNOMBRE',servicio.SERVNOMBRE);
            body.set('SERVACTIVO',servicio.SERVACTIVO);
            body.set('IDSUCURSAL',servicio.IDSUCURSAL.toString());

//****** */
            return this._http.post(this.url + 'postservicio', body, {headers : this.getHeaders()})
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

           return this._http.post(this.url + 'updateservicio', body, {headers : this.getHeaders()})
                .map((response:Response)=>{
                JSON.stringify(response);
              });
    }

    getlastservicio(){
      return this._http.get(this.url + 'getlastservicio')
            .map(res => res.json());
    }

    postPrenda(prenda: IPrendas){
       let body = new URLSearchParams();
            body.set('IDPRENDA',prenda.IDPRENDA.toString());
            body.set('PNOMBREUNIDAD',prenda.PNOMBREUNIDAD);
            body.set('PDESCRIPCION',prenda.PDESCRIPCION);

             return this._http.post(this.url + 'postprenda', body, {headers : this.getHeaders()})
                  .map((response:Response)=>{
                    JSON.stringify(response);
                  });
    }

    putPrenda(prenda: IPrendas){
       let body = new URLSearchParams();
            body.set('IDPRENDA',prenda.IDPRENDA.toString());
            body.set('PNOMBREUNIDAD',prenda.PNOMBREUNIDAD);
            body.set('PDESCRIPCION',prenda.PDESCRIPCION);

            return this._http.post(this.url + 'updateprenda', body, {headers : this.getHeaders()})
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
