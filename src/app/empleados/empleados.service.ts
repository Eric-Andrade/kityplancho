import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Empleados } from './empleados';
import { global } from '../global';

@Injectable()

export class EmpleadosService {
    public url: string;
    public local: string;

    constructor(private _http: Http) {
        this.local = global.local;
        this.url = global.url;
    }

    getEmpleados() {
        return this._http.get(this.url + 'empleados')
          .map(res => res.json());
    }

    getEmpleado(id:string) {
        return this._http.get(this.url + 'empleados?id=' + id)
          .map( res => res.json());
    }

    getLastEmpleado() {
        return this._http.get(this.url + 'empleados/getlastempleado')
          .map(res => res.json());
    }

    postEmpleado(empleado: Empleados) {
      let body = new URLSearchParams();
          body.set('EEMAIL', empleado.EEMAIL);
          body.set('EPASSWORD', empleado.EPASSWORD);
          body.set('EPRIVILEGIO', empleado.EPRIVILEGIO);
          body.set('ENOMBRE', empleado.ENOMBRE);
          body.set('EAPELLIDOS', empleado.EAPELLIDOS);
          body.set('ETELEFONO', empleado.ETELEFONO);
          body.set('EDIRECCION', empleado.EDIRECCION);
          body.set('EREFERENCIAFAM1', empleado.EREFERENCIAFAM1);
          body.set('EREFERENCIAFAM2', empleado.EREFERENCIAFAM2);
          body.set('EREFERENCIA1', empleado.EREFERENCIA1);
          body.set('EREFERENCIA2', empleado.EREFERENCIA2);
          body.set('EFECHACONTRATO', empleado.EFECHACONTRATO);
          body.set('EUBICACION', empleado.EUBICACION);
          body.set('ESUELDO', empleado.ESUELDO);
          body.set('ERFC', empleado.ERFC);
          body.set('EIMSS', empleado.EIMSS);
          body.set('ETIPOCONTRATO', empleado.ETIPOCONTRATO);
          body.set('IDSUCURSAL', empleado.IDSUCURSAL.toString());

          console.log('body emppleado post');
          console.log(body);
      const options = new RequestOptions({
          responseType: ResponseContentType.Json,
          withCredentials: false
        });
      return this._http.post(this.url + `empleados?${body}`, JSON.stringify({body: body}), options)
      .map((response:Response) => {
        console.log('Employee saved');
        JSON.stringify(response);
      });
    }

    putEmpleado(empleado: Empleados) {
        let body = new URLSearchParams();
            body.set('ID', empleado.ID.toString());
            body.set('EEMAIL', empleado.EEMAIL);
            body.set('EPASSWORD', empleado.EPASSWORD);
            body.set('EPRIVILEGIO', empleado.EPRIVILEGIO);
            body.set('ENOMBRE', empleado.ENOMBRE);
            body.set('EAPELLIDOS', empleado.EAPELLIDOS);
            body.set('ETELEFONO', empleado.ETELEFONO);
            body.set('EDIRECCION', empleado.EDIRECCION);
            body.set('EREFERENCIAFAM1', empleado.EREFERENCIAFAM1);
            body.set('EREFERENCIAFAM2', empleado.EREFERENCIAFAM2);
            body.set('EREFERENCIA1', empleado.EREFERENCIA1);
            body.set('EREFERENCIA2', empleado.EREFERENCIA2);
            body.set('EFECHACONTRATO', empleado.EFECHACONTRATO);
            body.set('EUBICACION', empleado.EUBICACION);
            body.set('ESUELDO', empleado.ESUELDO);
            body.set('ERFC', empleado.ERFC);
            body.set('EIMSS', empleado.EIMSS);
            body.set('ETIPOCONTRATO', empleado.ETIPOCONTRATO);
            body.set('IDSUCURSAL', empleado.IDSUCURSAL.toString());
            const options = new RequestOptions({
              responseType: ResponseContentType.Json,
              withCredentials: false
            });
          return this._http.put(this.url + `empleados?${body}`, JSON.stringify({body: body}), options)
          .map((response:Response) => {
            console.log('Employee updated');
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
