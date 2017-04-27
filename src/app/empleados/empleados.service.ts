import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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
        let params = JSON.stringify(empleado);
        let headers = new Headers({"Content-Type":"application/x-www-form-urlencoded"});
        // let headers = new Headers({"content-type":"application/x-www-form-urlencoded","cache-control":"no-cache",'Accept':'application/json','status':'OK'});
        return this._http.post(this.url+'postempleado',params,{headers:headers})
            .map(res => res.json())
            .catch((err:Response)=> Observable.throw(err.json()));
    }

    // postEmployee(empleado: Empleados){
    //   let params = JSON.stringify(empleado);
    //   let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded',Accept:'application/json',status:'OK'});
    //   return this._http.post(this.url+'postempleado',params,{headers:headers})
    //         .map(res => res.json());
    // }
}
