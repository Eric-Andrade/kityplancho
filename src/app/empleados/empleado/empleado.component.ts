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
    this.empleado = {IDEMPLEADO:0,EEMAIL:'',EPASSWORD:'',EPRIVILEGIO:'',ENOMBRE:'',EAPELLIDOS:'',ETELEFONO:'',EREFERENCIA1:'',EREFERENCIA2:'',EFECHACONTRATO:'',
                  EUBICACION:'',IDSUCURSAL:null};
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

  close(dialog: any) {
    dialog.close();
  }




  //Datepicker

  isOpenOnFocus = false;
  isOpen = false;
  today: Date = new Date();
  type: string = 'date';
  types: Array<any> = [
    { text: 'Date', value: 'date' },
    { text: 'Time', value: 'time' },
    { text: 'Date Time', value: 'datetime' }];

  mode: string = 'auto';
  modes: Array<any> = [
    { text: 'Auto', value: 'auto' },
    { text: 'Portrait', value: 'portrait' },
    { text: 'Landscape', value: 'landscape' }];

  container: string = 'inline';
  containers: Array<any> = [
    { text: 'Inline', value: 'inline' },
    { text: 'Dialog', value: 'dialog' }];

  date: Date = null;
  minDate: Date = null;
  maxDate: Date = null;
  enableDates: Array<Date> = [
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 5),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 8)
  ];
  disableDates: Array<Date> = [
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 2),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 2),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 5),
    new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 9)
  ];
  disableWeekDays: Array<number> = [0, 6];

  openDatepicker() {
    this.isOpen = true;
    setTimeout(() => {
      this.isOpen = false;
    }, 1000);
  }

  setDate() {
    this.date = new Date(this.today);
  }

  setDateRange() {
    this.minDate = new Date(this.today);
    this.minDate.setMonth(this.minDate.getMonth() - 3);
    this.maxDate = new Date(this.today);
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }
}
