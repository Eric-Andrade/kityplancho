import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
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
        return this._http.get(this.url + 'getempleados')
          .map(res => res.json());
    }

    getEmpleado(id:string) {
        return this._http.get(this.url + 'getempleado?id='+id)
          .map( res => res.json());
    }

    getLastEmpleado() {
        return this._http.get(this.url + 'getlastempleado')
          .map(res => res.json());
    }

    postEmpleado(empleado: Empleados){
      let body = new URLSearchParams();
          body.set('EEMAIL',empleado.EEMAIL);
          body.set('EPASSWORD',empleado.EPASSWORD);
          body.set('EPRIVILEGIO',empleado.EPRIVILEGIO);
          body.set('ENOMBRE',empleado.ENOMBRE);
          body.set('EAPELLIDOS',empleado.EAPELLIDOS);
          body.set('ETELEFONO',empleado.ETELEFONO);
          body.set('EDIRECCION',empleado.EDIRECCION);
          body.set('EREFERENCIAFAM1',empleado.EREFERENCIAFAM1);
          body.set('EREFERENCIAFAM2',empleado.EREFERENCIAFAM2);
          body.set('EREFERENCIA1',empleado.EREFERENCIA1);
          body.set('EREFERENCIA2',empleado.EREFERENCIA2);
          body.set('EFECHACONTRATO',empleado.EFECHACONTRATO);
          body.set('EUBICACION',empleado.EUBICACION);
          body.set('ESUELDO',empleado.ESUELDO);
          body.set('ERFC',empleado.ERFC);
          body.set('EIMSS',empleado.EIMSS);
          body.set('ETIPOCONTRATO',empleado.ETIPOCONTRATO);
          body.set('IDSUCURSAL',empleado.IDSUCURSAL.toString());
        // body.set('IDEA',empleado.IDEA.toString());
        // body.set('EAINE',empleado.EAINE);
        // body.set('EACURP',empleado.EACURP);
        // body.set('EAACTANACIMIEN',empleado.EAACTANACIMIENTO);
        // body.set('EACOMPROBANTEDOM',empleado.EACOMPROBANTEDOM);
        // body.set('IDEMPLEADOEA',empleado.IDEMPLEADOEA.toString());
      console.log('body de empleado');
      console.log(body);
      return this._http.post(this.url + 'postempleado', body, {headers : this.getHeaders()})
      .map((response:Response)=>{
        console.log('Employee saved');
        JSON.stringify(response);
      });
    }

    putEmpleado(empleado: Empleados){
        let body = new URLSearchParams();
            body.set('IDEMPLEADO',empleado.IDEMPLEADO.toString());
            body.set('EEMAIL',empleado.EEMAIL);
            body.set('EPASSWORD',empleado.EPASSWORD);
            body.set('EPRIVILEGIO',empleado.EPRIVILEGIO);
            body.set('ENOMBRE',empleado.ENOMBRE);
            body.set('EAPELLIDOS',empleado.EAPELLIDOS);
            body.set('ETELEFONO',empleado.ETELEFONO);
            body.set('EDIRECCION',empleado.EDIRECCION);
            body.set('EREFERENCIAFAM1',empleado.EREFERENCIAFAM1);
            body.set('EREFERENCIAFAM2',empleado.EREFERENCIAFAM2);
            body.set('EREFERENCIA1',empleado.EREFERENCIA1);
            body.set('EREFERENCIA2',empleado.EREFERENCIA2);
            body.set('EFECHACONTRATO',empleado.EFECHACONTRATO);
            body.set('EUBICACION',empleado.EUBICACION);
            body.set('ESUELDO',empleado.ESUELDO);
            body.set('ERFC',empleado.ERFC);
            body.set('EIMSS',empleado.EIMSS);
            body.set('ETIPOCONTRATO',empleado.ETIPOCONTRATO);
            body.set('IDSUCURSAL',empleado.IDSUCURSAL.toString());
            console.log('Body empleado update');
            console.log(body);

           return this._http.post(this.url + 'updateempleado', body, {headers : this.getHeaders()})
          .map((response:Response)=>{
            console.log('Employee updated');
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
