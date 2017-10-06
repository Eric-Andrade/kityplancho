import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, ResponseContentType, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
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
        return this._http.get(this.url + 'prendas')
            .map(res => res.json());
    }

 getPrenda(id: number) {
        return this._http.get(this.url + 'prendas?id='+id)
          .map(res => res.json());
 }

postPrenda(prenda: IPrendas){
  let body = new URLSearchParams();
      body.set('PNOMBREUNIDAD', prenda.PNOMBREUNIDAD);
      body.set('PDESCRIPCION', prenda.PDESCRIPCION);
        console.log('Prenda body');
        console.log(body);
        console.log(prenda);

      return this._http.post(this.url + `prendas?${body}`, body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        JSON.stringify(response);
      });

}

putPrenda(prenda: IPrendas): Observable<any> {
  let body = new URLSearchParams();
      body.set('ID', prenda.ID.toString());
      body.set('PNOMBREUNIDAD', prenda.PNOMBREUNIDAD);
      body.set('PDESCRIPCION', prenda.PDESCRIPCION);

          const options = new RequestOptions({
            // method: 'PUT',
            // headers: this.getHeaders(),
            responseType: ResponseContentType.Json,
            withCredentials: false
          });

        // console.log('Options: ' + JSON.stringify(options));
        // console.log('Prenda body   ' + body);

      return this._http.put(this.url + `prendas?${body}`, JSON.stringify({body: body}), options)
      .map((response: Response) => {
        JSON.stringify(response);
        console.log('response   ' + response);
      })
      .catch(this.handleError);
}

private getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Requested-With', 'XMLHttpRequest');
        headers.append('cache-control', 'no-cache');
        headers.append('status', 'OK');
        return headers;
      }

public handleError(error: Response) {
    console.error('Error :v ' + error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
