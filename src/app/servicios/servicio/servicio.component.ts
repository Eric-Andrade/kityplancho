import { PrendasService } from '../prendas/prendas.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IServicios, Servicios, IPrendas, SPone } from '../servicios';
import { ServiciosService } from '../servicios.service';
import { Md2Toast } from 'md2';
import { SucursalesService } from '../../sucursales/sucursales.service';
import { Sucursales } from '../../sucursales/sucursales';

@Component({
  selector: 'kp-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
  providers: [ ServiciosService, SucursalesService, PrendasService ]
})

export class ServicioComponent implements OnInit {
  public iservicio: IServicios;
  public spone: SPone;
  public servicio: Servicios;
  public iprenda: IPrendas[];
  public errorMessage;
  public isRequired: boolean;
  public isDisabled: boolean;
  public sucursales: Sucursales[];
  public message: boolean;
  public tab1disabled: boolean;
  public tab2disabled: boolean;
  public selectedIndex: number;
  public autoTicks = true;
  public disabled = false;
  public invert = false;
  public max = 100;
  public min = 0;
  public showTicks = true;
  public step = 1;
  public thumbLabel = true;
  public value = 0;
  public vertical = false;
  public next: boolean;
  public lastservicio:number;

  constructor(private _serviciosService: ServiciosService,
              private _prendasService: PrendasService,
              private toast: Md2Toast,
              private _route: ActivatedRoute,
              private _router: Router,
              private _sucursalesService: SucursalesService,) {
                this.isRequired = true;
                this.selectedIndex = 0;
                this.tab1disabled = false;
                this.tab2disabled = true;
                this.next = true;
               }

  ngOnInit() {
    this.getSucursales();
    this.iservicio = {
      ID :null,
      SERVNOMBRE:'',
      SERVACTIVO:'activo',
      IDSUCURSAL:null
    }

    this.servicio = {
      ID:null,
      IDPRENDA:null,
      IDSERVICIO:null,
      SERVNOMBRE:'',
      PNOMBREUNIDAD:'',
      SPCOSTO:null,
      SPDESCUENTO:null,
    }

    this.spone = {
      IDPRENDAS:null,
      IDSERVICIO:null,
      IDSP:null,
      SPCOSTO:null,
      SPDESCUENTO:0,
    }
  }

  postServicio(){
        // this.toastMe();
        // this.tab1disabled = true
        // this.tab2disabled = false;
        // this.selectedIndex = 1;
        this.getprendas();
        this.getlastservicio();

    this._serviciosService.postServicio(this.iservicio).subscribe(
            data => {
                this.toastMe();
                this.tab1disabled = true;
                this.tab2disabled = false;
                this.selectedIndex = 1;
            },

            error =>  {
                console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
                 this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                  this.failpostSP();
              }
            });
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
                console.log(this.errorMessage);
                this.message = true;
            }
        });
  }

  public getlastservicio(){
    setTimeout(()=>{
          this._serviciosService.getlastservicio().subscribe(
          result => {
                 this.lastservicio = result.ULTIMOSERVICIO[0].IDSERVICIO;
                  console.log('Último servicio');
                  console.log(this.lastservicio);
              if (!this.lastservicio) {
                  console.warn('Error en el servidor...');
              }else{
                  // this.loading = false;
              }
          },
          error => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null ) {
                  console.log(`This is the error: ${this.errorMessage}`);
                  this.message = true;
                  this.failgetLastServicio();
              }
          }

        );
        },500);
  }

  public getprendas(){
     this._prendasService.getPrendas().subscribe(
        response => {
          console.log('getprendas!!!!');
            console.log(response);
            this.iprenda = response;
            if (!this.iprenda) {
                console.log('Error en el servidor...');
            }else{
                console.log('Prendas cargadas correctamente');
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

  public postSP(){

    this.next = false;
     this.spone.IDSERVICIO = this.lastservicio;
     console.log('Servicio!!!!');
            console.log(this.spone);
      this._serviciosService.postSP(this.spone).subscribe(
        data => {
          this.next = false;
            this.postServiciotoast();

        },

        error =>  {
            console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
              this.failpostSP();
          }
        });
  }


  getservicio(serviciodialog, idservicio){
      this.close(serviciodialog);
      setTimeout(()=>{
          this._router.navigate(['servicios/servicio/',idservicio]);
        },500);
  }

 close(dialog: any) {
    dialog.close();
  }

  toastMe() {
     this.toast.toast(`Nuevo servicio creado exitosamente`);
  }

  postServiciotoast() {
      this.toast.toast(`Prenda vinculada al servicio`);
    }

  failpostSP() {
     this.toast.toast(`Ocurrió un problema al intentar crear un nuevo servicio. Recarga la página por favor`);
  }

  failgetLastServicio() {
      this.toast.toast(`Temporalmente no se puede continuar con el registro del servicio`);
    }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : null;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 5;

}
