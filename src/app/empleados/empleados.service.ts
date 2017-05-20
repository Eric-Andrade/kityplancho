import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Empleados } from './empleados';

@Injectable()

export class EmpleadosService {
    public url: string;
    public local: string;

    constructor(private _http: Http) {
        this.local = 'http://localhost:8080/kityplancho_api/api/procesos/';
        this.url = 'http://kityplanchoapi.mybluemix.net/api/v1/';
    }

    getEmpleados() {
        return this._http.get(this.url + 'getempleados')
          .map(res => res.json());
    }

    getEmpleado(id:string) {
        return this._http.get(this.url + 'getempleado?id='+id)
          .map( res => res.json());
    }

    postEmpleado(empleado: Empleados){
      let body = new URLSearchParams();
      body.set('EEMAIL',empleado.EEMAIL);
      body.set('EPASSWORD',empleado.EPASSWORD);
      body.set('EPRIVILEGIO',empleado.EPRIVILEGIO);
      body.set('ENOMBRE',empleado.ENOMBRE);
      body.set('EAPELLIDOS',empleado.EAPELLIDOS);
      body.set('ETELEFONO',empleado.ETELEFONO);
      body.set('EREFERENCIA1',empleado.EREFERENCIA1);
      body.set('EREFERENCIA2',empleado.EREFERENCIA2);
      body.set('EFECHACONTRATO',empleado.EFECHACONTRATO);
      body.set('EUBICACION',empleado.EUBICACION);
      body.set('IDSUCURSAL',empleado.IDSUCURSAL.toString());
        // body.set('IDEA',empleado.IDEA.toString());
        // body.set('EAINE',empleado.EAINE);
        // body.set('EACURP',empleado.EACURP);
        // body.set('EAACTANACIMIEN',empleado.EAACTANACIMIENTO);
        // body.set('EACOMPROBANTEDOM',empleado.EACOMPROBANTEDOM);
        // body.set('IDEMPLEADOEA',empleado.IDEMPLEADOEA.toString());

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
            body.set('EREFERENCIA1',empleado.EREFERENCIA1);
            body.set('EREFERENCIA2',empleado.EREFERENCIA2);
            body.set('EFECHACONTRATO',empleado.EFECHACONTRATO);
            body.set('EUBICACION',empleado.EUBICACION);
            body.set('IDSUCURSAL',empleado.IDSUCURSAL.toString());
              // body.set('IDEA',empleado.IDEA.toString());
              // body.set('EAINE',empleado.EAINE);
              // body.set('EACURP',empleado.EACURP);
              // body.set('EAACTANACIMIEN',empleado.EAACTANACIMIENTO);
              // body.set('EACOMPROBANTEDOM',empleado.EACOMPROBANTEDOM);
              // body.set('IDEMPLEADOEA',empleado.IDEMPLEADOEA.toString());

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
