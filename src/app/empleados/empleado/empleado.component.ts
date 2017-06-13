import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { Empleados, EmpleadoAdjuntos } from '../empleados';
import { SucursalesService } from '../../sucursales/sucursales.service';
import { Sucursales } from '../../sucursales/sucursales';
import { Md2Toast } from 'md2';

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
    public empleadoad: EmpleadoAdjuntos;
    public errorMessage;
    public currentSucursals: string;
    public currentSucursales: string;
    public sucursales: Sucursales[];
    public loading: boolean;
    public message: boolean;
    tab1disabled: boolean;
    tab2disabled: boolean;
    selectedIndex: number;

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:10050/upload'
  };
  sizeLimit = 2000000;

  constructor(private _empleadosService: EmpleadosService,
              private _route:ActivatedRoute,
              private _router:Router,
              private _sucursalesService: SucursalesService,
              private toast: Md2Toast) {

    this.opcionempleado = 'nuevo empleado';
    this.isRequired = true;
    this.isDisabled = false;
    this.isDisabledMultiple = false;
    this.itemMultiple = null;
    this.tab1disabled = false
    this.tab2disabled = true;
    }

   ngOnInit( ) {
     this.getSucursales();
    this.empleado = { IDEMPLEADO:0,
                      EEMAIL:'vero@hotmail.com',
                      EPASSWORD:'123213',
                      EPRIVILEGIO:'rutero',
                      ENOMBRE:'vero',
                      EAPELLIDOS:'nicads',
                      ETELEFONO:'1234567890',
                      EREFERENCIA1:'ref1dasdsadasdsadsadsad',
                      EREFERENCIA2:'ref2sadasdasdsadsadsaddsa',
                      EFECHACONTRATO:'2017-04-13',
                      EUBICACION:'Dgo',
                      IDSUCURSAL:null,
                    };

    this.empleadoad = {
        IDEA: 0,
        EAINE:'',
        EACURP:'',
        EAACTANACIMIENTO:'',
        EACOMPROBANTEDOM:'',
        IDEMPLEADO: 1
    }
  }

  public postEmpleado(){

      this.toastMe();
      this.tab1disabled = true
      this.tab2disabled = false;
      this.selectedIndex = 1;

    // this._empleadosService.postEmpleado(this.empleado).subscribe(
    //       data => {
    //             this.toastMe();
    //            this.tab1disabled = true
    //            this.tab2disabled = false;
    //            this.selectedIndex = 1;
    //       },

    //       error =>  {
    //           console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
    //            this.errorMessage = <any>error;
    //             if(this.errorMessage != null){
    //             this.failpostEmpleado();
    //         }
    //       });
  }

  public postEmpleadoAdjuntos(){

    this._empleadosService.postEmpleado(this.empleado).subscribe(
          data => {
                this.postempleadoad();
          },

          error =>  {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                this.failpostempleadoad();
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

 toastMe() {
      this.toast.toast(`El empleado
      ${this.empleado.ENOMBRE}
      ${this.empleado.EAPELLIDOS} fue guardado exitosamente`);
    }

  failpostEmpleado() {
      this.toast.toast(`Algo falló al intentar guardar al empleado
      ${this.empleado.ENOMBRE}
      ${this.empleado.EAPELLIDOS}, intenta de nuevo por favor`);
    }

  postempleadoad(){
      this.toast.toast(`Archivos de ${this.empleado.ENOMBRE} ${this.empleado.EAPELLIDOS}, guardados exitosamente`);
  }

  failpostempleadoad() {
      this.toast.toast(`Algo falló al intentar los guardar archivos del empleado
      ${this.empleado.ENOMBRE}
      ${this.empleado.EAPELLIDOS}, intenta de nuevo por favor`);
    }
}

