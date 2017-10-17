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
    public tab1disabled: boolean;
    public tab2disabled: boolean;
    public selectedIndex: number;
    public lastempleado: number;
    public tipodecontrato: Array<any>;
    // public uploadFile: any;
    // public hasBaseDropZoneOver: boolean = false;
    // public options;
    // sizeLimit = 2000000;

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
              this.tab1disabled = false;
              this.tab2disabled = true;
              this.tipodecontrato = [
                        { tipo: 'asimilados', nombre: 'Asimilados a salarios'},
                        { tipo: 'nomina', nombre: 'Nomina'},
                        { tipo: 'honorarios', nombre: 'Honorarios'},
                        { tipo: 'raya', nombre: 'Raya (efectivo)'},
                    ];
    }

   ngOnInit( ) {
     this.getSucursales();
    this.empleado = { ID: 0,
                      EEMAIL: '',
                      EPASSWORD: '',
                      EPRIVILEGIO: 'rutero',
                      ENOMBRE: '',
                      EAPELLIDOS: '',
                      ETELEFONO: '',
                      EDIRECCION: '',
                      EREFERENCIAFAM1: '',
                      EREFERENCIAFAM2: '',
                      EREFERENCIA1: '',
                      EREFERENCIA2: '',
                      EFECHACONTRATO: '',
                      EUBICACION: '24.02780775285771,-104.65332895517349',
                      ESUELDO: '',
                      ERFC: '',
                      EIMSS: '',
                      ETIPOCONTRATO: 'raya',
                      IDSUCURSAL: 1,
                      // TOAE920427HDGRNR07
                    };

    this.empleadoad = {
        IDEA: 0,
        EAINE: '',
        EACURP: '',
        EAACTANACIMIENTO: '',
        EACOMPROBANTEDOM: '',
        IDEMPLEADO: null
    }
  }

   getlastempleado() {
   setTimeout(() => {
      this._empleadosService.getLastEmpleado().subscribe(
        result => {
              this.lastempleado = result.ID;
              console.log('último empleado');
              console.log(this.lastempleado);
              if(!this.lastempleado){
                  console.log('Error en el servidor...');
              }else{

              }
          },
          error =>{
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  this.message = true;
                  this.toastMe();
              }
          }
    );
   }, 1000);
  }

  public next(){
      this.tab1disabled = false;
      this.tab2disabled = false;
      this.selectedIndex = 1;
  }

  public postEmpleado(empleadodialog){

    this._empleadosService.postEmpleado(this.empleado).subscribe(
          data => {
            this.getlastempleado();
               this.tab1disabled = true;
               this.tab2disabled = false;
               this.selectedIndex = 1;

               setTimeout(()=>{
                 this.toastMe();
                 let idempleado = this.lastempleado;
                     this._router.navigate(['empleados',idempleado]);
                     console.log('enviar al empleado desde el post');
                     this.close(empleadodialog);
               },1800);
              //  this._router.navigate(['clientes',idcliente])
          },

          error =>  {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                this.failpostEmpleado();
            }
          });
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
            this.sucursales = response;
            if (!this.sucursales) {
                console.log('Error en el servidor...');
            }else {
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

  close(dialog: any) {
    dialog.close();
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

    failgetLastEmpleado() {
      this.toast.toast(`Temporalmente no se puede continuar con el registro del empleado`);
    }

  //     handleUpload(data): void {
  //   if (data && data.response) {
  //     data = JSON.parse(data.response);
  //     this.uploadFile = data;
  //   }
  // }

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

