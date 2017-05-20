// import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Empleados } from './empleados';
import { EmpleadosService } from './empleados.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

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
            private _router: Router,
            private toast: Md2Toast) {
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
                    this.empleado = response.EMPLEADO;
                    this.loading = false;
                    this.empleado = {
                        IDEMPLEADO:this.empleado[0].IDEMPLEADO,
                        EEMAIL:this.empleado[0].EEMAIL,
                        EPASSWORD:this.empleado[0].EPASSWORD,
                        EPRIVILEGIO:this.empleado[0].EPRIVILEGIO,
                        ENOMBRE:this.empleado[0].ENOMBRE,
                        EAPELLIDOS:this.empleado[0].EAPELLIDOS,
                        ETELEFONO:this.empleado[0].ETELEFONO,
                        EREFERENCIA1:this.empleado[0].EREFERENCIA1,
                        EREFERENCIA2:this.empleado[0].EREFERENCIA2,
                        EFECHACONTRATO:this.empleado[0].EFECHACONTRATO,
                        EUBICACION:this.empleado[0].EUBICACION,
                        IDSUCURSAL:this.empleado[0].IDSUCURSAL,
                              // IDEA: 0,
                              // EAINE: 'EMPLEADOIFE.jpg',
                              // EACURP: 'EMPLEADOCURP.jpg',
                              // EAACTANACIMIENTO: 'EMPLEADOACTANACIMIENTO.jpg',
                              // EACOMPROBANTEDOM: 'EMPLEADOCOMPROBANTEDOM.jpg',
                              // IDEMPLEADOEA: 0
                    };
                    if(!this.empleado){
                    this._router.navigate(['/empleados']);
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

    putEmpleado(){
        if(!this.empleado) return;
          this._empleadosService.putEmpleado(this.empleado).subscribe(
          data => {
              console.log(this.empleado);
               this.toastMe();
               this._router.navigate(['/empleados', this.empleado.IDEMPLEADO]);

          }, error => {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                console.log(`Error al actualizar empleado: ${this.errorMessage}`);
                alert(`Error al guardar nuevo empleado: ${this.errorMessage}`);
            }
          })
    }

    toastMe() {
          this.toast.toast(`Datos de
          ${this.empleado.ENOMBRE} ${this.empleado.EAPELLIDOS}
          actualizados exitosamente`);
        }

    regresar(){
      this._router.navigate(['empleados']);
  }
}
