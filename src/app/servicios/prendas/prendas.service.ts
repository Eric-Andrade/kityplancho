import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IPrendas } from '../servicios';
import { global } from '../../global';

@Injectable()
export class PrendasService {
    public url: string;
    public local: string;

    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
    }

getPrendas() {
        return this._http.get(this.url + 'getprendas')
            .map(res => res.json());
    }

 getPrenda(id: string) {
        return this._http.get(this.url + 'getprenda?id='+id)
          .map(res => res.json());
 }

postPrenda(prenda: IPrendas){
  let body = new URLSearchParams();
      body.set('PNOMBREUNIDAD',prenda.PNOMBREUNIDAD);
      body.set('PDESCRIPCION',prenda.PDESCRIPCION);
        console.log('Prenda body');
        console.log(body);
        console.log(prenda);

      return this._http.post(this.url + 'postprenda', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        JSON.stringify(response);
      });

}

putPrenda(prenda: IPrendas){
  let body = new URLSearchParams();
      body.set('IDPRENDAS',prenda.IDPRENDAS.toString());
      body.set('PNOMBREUNIDAD',prenda.PNOMBREUNIDAD);
      body.set('PDESCRIPCION',prenda.PDESCRIPCION);
        console.log('Prenda body');

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
