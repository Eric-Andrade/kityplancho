// import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Empleados } from './empleados';
import { EmpleadosService } from './empleados.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';
import { SucursalesService } from '../sucursales/sucursales.service';
import { Sucursales } from '../sucursales/sucursales';

@Component({
  selector: 'kp-empleadodetalle',
  templateUrl: 'empleadodetalle.component.html',
  styleUrls: ['empleadodetalle.component.css'],
  providers: [ EmpleadosService, SucursalesService ]
})

export class EmpleadoDetalleComponent implements OnInit {
  public errorMessage;
  public message: boolean;
  public empleado: Empleados;
  public loading: boolean;
  public isRequired: boolean;
  public isDisabled: boolean;
  public sucursales: Sucursales[];
  public tipodecontrato: Array<any>;

  // uploadFile: any;
  // hasBaseDropZoneOver: boolean = false;
  // options: Object = {
  //   url: 'http://localhost:10050/upload'
  // };
  // sizeLimit = 2000000;


  constructor(private _empleadosService: EmpleadosService,
            private _route: ActivatedRoute,
            private _router: Router,
            private toast: Md2Toast,
            private _sucursalesService: SucursalesService,) {
              this.loading = true;
              this.tipodecontrato = [
                          { tipo: 'asimilados', nombre: 'Asimilados a salarios'},
                          { tipo: 'nomina', nombre: 'Nomina'},
                          { tipo: 'honorarios', nombre: 'Honorarios'},
                          { tipo: 'raya', nombre: 'Raya (efectivo)'},
                      ];
  }

ngOnInit() {
    this.getEmpleado();
    this.getSucursales();
  }

getEmpleado() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._empleadosService.getEmpleado(id).subscribe(
              response => {
                    this.empleado = response;
                    this.loading = false;
                    this.empleado = {
                        ID:this.empleado.ID,
                        EEMAIL:this.empleado.EEMAIL,
                        EPASSWORD:this.empleado.EPASSWORD,
                        EPRIVILEGIO:this.empleado.EPRIVILEGIO,
                        ENOMBRE:this.empleado.ENOMBRE,
                        EAPELLIDOS:this.empleado.EAPELLIDOS,
                        ETELEFONO:this.empleado.ETELEFONO,
                        EDIRECCION:this.empleado.EDIRECCION,
                        EREFERENCIAFAM1:this.empleado.EREFERENCIAFAM1,
                        EREFERENCIAFAM2:this.empleado.EREFERENCIAFAM2,
                        EREFERENCIA1:this.empleado.EREFERENCIA1,
                        EREFERENCIA2:this.empleado.EREFERENCIA2,
                        EFECHACONTRATO:this.empleado.EFECHACONTRATO,
                        EUBICACION:this.empleado.EUBICACION,
                        ESUELDO:this.empleado.ESUELDO,
                        ERFC:this.empleado.ERFC,
                        EIMSS:this.empleado.EIMSS,
                        ETIPOCONTRATO:this.empleado.ETIPOCONTRATO,
                        IDSUCURSAL:this.empleado.IDSUCURSAL,
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
                    this.failgetEmpleado();
                }
              }
            );
        });
    }

putEmpleado(){
        if(!this.empleado) return;
          this._empleadosService.putEmpleado(this.empleado).subscribe(
          data => {;
               this.toastMe();
               this._router.navigate(['/empleados', this.empleado.ID]);

          }, error => {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                this.failputEmpleado();
            }
          })
    }

  public getSucursales(){
      this._sucursalesService.getSucursales().subscribe(
        response => {
            this.sucursales = response;
            if (!this.sucursales) {
                console.log('Error en el servidor...');
            }else{
                // console.log('Sucursales cargadas correctamente');
            }
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
                console.log('Error 129', this.errorMessage);
                this.message = true;
            }
        });
  }

toastMe() {
          this.toast.toast(`Datos de
          ${this.empleado.ENOMBRE} ${this.empleado.EAPELLIDOS}
          actualizados exitosamente`);
        }

failputEmpleado() {
          this.toast.toast(`Error al actualizar la información de
          ${this.empleado.ENOMBRE} ${this.empleado.EAPELLIDOS}, intenta nuevamente por favor`);
        }

failgetEmpleado() {
            this.toast.toast('Error al encontrar la información de este empleado, intenta nuevamente por favor');
          }

regresar(){
      this._router.navigate(['empleados']);
    }

// handleUpload(data): void {
//     if (data && data.response) {
//       data = JSON.parse(data.response);
//       this.uploadFile = data;
//       alert('Archivo subido')
//     }
//   }

// fileOverBase(e:any):void {
//   this.hasBaseDropZoneOver = e;
// }

// beforeUpload(uploadingFile): void {
//   if (uploadingFile.size > this.sizeLimit) {
//     uploadingFile.setAbort();
//     alert('File is too large');
//   }
// }
}
