import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { Empleados } from '../empleados';

@Component({
  selector: 'kp-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers:[EmpleadosService]
})
export class EmpleadoComponent implements OnInit {
    public opcionempleado: string;
    public isRequired: boolean;
    public isDisabled: boolean;
    public isDisabledMultiple: boolean;
    public itemMultiple: any;
    public empleado: Empleados;
    public errorMessage;
    public currentSucursals:string;
    public sucursales: Array<any>;

  constructor(private _empleadosService: EmpleadosService,
              private _route:ActivatedRoute,
              private _router:Router) {

    this.opcionempleado = 'nuevo empleado';
    this.isRequired = true;
    this.isDisabled = false;
    this.isDisabledMultiple = false;
    this.itemMultiple = null;
    this.sucursales = [{id:1, name:"Sucursal 1"},
                      {id:2, name:"sucursal 2"}];
              }

   ngOnInit( ) {
      // this.empleado = new Empleados('ok@ok.com','ok','admin','ok','ok','ok','ok','ok','ok','ok',1);
  this.empleado = {IDEMPLEADO:0,EEMAIL:'empleado@hotmail.com',EPASSWORD:'1234567890',EPRIVILEGIO:'empleado',ENOMBRE:'Don ñeñe empleado',EAPELLIDOS:'Ñuñez',ETELEFONO:'1234567890',EREFERENCIA1:'Referencia1',EREFERENCIA2:'Referencia2',EFECHACONTRATO:'2017-04-11',
                  EUBICACION:'ok',IDSUCURSAL:null};
// ENUM('admin', 'empleado', 'rutero', 'desempleado')
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

launchDialog(dialog: any) {
    dialog.open();
  }

  open(dialog: any) {
    dialog.open();
  }

  close(dialog: any) {
    dialog.close();
  }

  openAlert(event: Event) { }

  openConfirm(event: Event) { }

  openPrompt(event: Event) { }

  openAdvanced(event: Event) { }

  openTabDialog(event: Event) { }



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