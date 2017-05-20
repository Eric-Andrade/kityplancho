import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { Empleados } from '../empleados';
import { SucursalesService } from '../../sucursales/sucursales.service';
import { Sucursales } from '../../sucursales/sucursales';

@Component({
  selector: 'kp-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers:[ EmpleadosService, SucursalesService ]
})

export class EmpleadoComponent implements OnInit {
    public opcionempleado: string;
    public isRequired: boolean;
    public isDisabled: boolean;
    public isDisabledMultiple: boolean;
    public itemMultiple: any;
    public empleado: Empleados;
    public errorMessage;
    public currentSucursals: string;
    public currentSucursales: string;
    public sucursales: Sucursales[];
    public loading: boolean;
    public message: boolean;

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:10050/upload'
  };
  sizeLimit = 2000000;

  constructor(private _empleadosService: EmpleadosService,
              private _route:ActivatedRoute,
              private _router:Router,
              private _sucursalesService: SucursalesService) {

    this.opcionempleado = 'nuevo empleado';
    this.isRequired = true;
    this.isDisabled = false;
    this.isDisabledMultiple = false;
    this.itemMultiple = null;
    }

   ngOnInit( ) {
     this.getSucursales();
    this.empleado = {IDEMPLEADO:0,
                      EEMAIL:'vero@hotmail.com',
                      EPASSWORD:'123213',
                      EPRIVILEGIO:'admin',
                      ENOMBRE:'vero',
                      EAPELLIDOS:'nica',
                      ETELEFONO:'1234567890',
                      EREFERENCIA1:'ref1',
                      EREFERENCIA2:'ref2',
                      EFECHACONTRATO:'2017-04-13',
                      EUBICACION:'Dgo',
                      IDSUCURSAL:0,
                        // IDEA: 0,
                        // EAINE: 'EMPLEADOIFE.jpg',
                        // EACURP: 'EMPLEADOCURP.jpg',
                        // EAACTANACIMIENTO: 'EMPLEADOACTANACIMIENTO.jpg',
                        // EACOMPROBANTEDOM: 'EMPLEADOCOMPROBANTEDOM.jpg',
                        // IDEMPLEADOEA: 0
                      };
  }

  public postEmpleado(){
    this._empleadosService.postEmpleado(this.empleado).subscribe(
          data => {
               console.log(`El empleado ${this.empleado.IDEMPLEADO} | ${this.empleado.ENOMBRE} fue creado exitosamente!`);
               this._router.navigate(['empleados']);
          },

          error =>  {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                console.log(`Error al guardar nuevo empleado: ${this.errorMessage}`);
                alert(`Error al guardar nuevo empleado: ${this.errorMessage}`);
            }
          });
  }

    public getSucursales(){
      this._sucursalesService.getSucursales().subscribe(
        response => {
            console.log(response);
            this.sucursales = response.SUCURSALES;
            if (!this.sucursales) {
                console.log('Error en el servidor...');
            }else{
                console.log('Sucursales cargadas correctamente');
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

  open(dialog: any) {
    dialog.open();
  }



}

