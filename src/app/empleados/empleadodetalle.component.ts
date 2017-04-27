// import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Empleados } from './empleados';
import { EmpleadosService } from './empleados.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'kp-empleadodetalle',
  templateUrl: 'empleadodetalle.component.html',
  styleUrls: ['empleadodetalle.component.css'],
  providers: [ EmpleadosService ]
})

export class EmpleadoDetalleComponent implements OnInit {
  public errorMessage;
  public message: boolean;
  public empleado: Empleados;
  public loading: boolean;

  constructor(private _empleadosService: EmpleadosService,
            private _route: ActivatedRoute,
            private _router: Router) {
              this.loading = true;
  }

ngOnInit() {
    this.getEmpleado();
}

    getEmpleado() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._empleadosService.getEmpleado(id).subscribe(
              response => {
                    if (!response) {
                        this._router.navigate(['/empleados']);
                    }else {
                        this.empleado = response.EMPLEADO;
                        this.loading = false;
                        console.log(this.empleado);
                      // this.e = {EMPLEADO:response.EMPLEADO}
                    }
              },
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    this.message = true;
                }
              }
            );
        });
    }
}
