// import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { Empleados } from './empleados';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'kp-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
    public loading: boolean;
    public message: boolean;
    public errorMessage;
    public empleados: Empleados[];
    public empleadosCard = true;
  constructor(private _empleadoService: EmpleadosService) {
    this.loading = true;
    this.message = false; }

  ngOnInit() {
      this._empleadoService.getEmpleados().subscribe(
        response => {
            console.log(response);
            this.empleados = response.EMPLEADOS;
            if (!this.empleados) {
                console.log('Error en el servidor...');
            }else{
                this.loading = false;
            }
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                this.message = true;
            }
        });
  }
}
