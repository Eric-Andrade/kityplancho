import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Servicios } from './servicios';

@Injectable()

export class ServiciosService {
    public local: string;
    public url: string;

    constructor(private _http: Http) {
        this.local = 'http://localhost:8080/kityplancho_api/api/procesos/';
        this.url = 'http://kityplanchoapi.mybluemix.net/api/v1/';

    }

    getServicios() {
        return this._http.get(this.url + 'getserviciosprendas')
            .map(res => res.json());
    }

}
