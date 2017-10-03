// import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { Empleados } from './empleados';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
   providers:[EmpleadosService]
})
export class EmpleadosComponent implements OnInit {
    public loading: boolean;
    public message: boolean;
    public errorMessage;
    public empleados: Empleados[];
    public empleadosCard = true;
    userFilter: any = { ENOMBRE: ''};
  constructor(private _empleadoService: EmpleadosService,
              private _route: ActivatedRoute,
              private _router: Router,
              private toast: Md2Toast,) {
    this.loading = true;
    this.message = false; }

  ngOnInit() {
      this._empleadoService.getEmpleados().subscribe(
        response => {
            console.log(response);
            this.empleados = response;
            if (!this.empleados) {
                console.log('Error en el servidor...');
                this.toastMe();
            }else{
                this.loading = false;
            }
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                this.message = true;
                this.toastMe();
            }
        });
  }

  getempleado(idempleado){
      this._router.navigate(['empleados',idempleado]);
  }

  toastMe() {

      this.toast.toast(`Algo falló al tratar de obtener la lista de empleados, intenta nuevamente por favor`);
    }
}
