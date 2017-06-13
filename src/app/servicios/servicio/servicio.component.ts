import { PrendasService } from '../prendas/prendas.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IServicios, Servicios, IPrendas } from '../servicios';
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



  constructor(private _serviciosService: ServiciosService,
              private _prendasService: PrendasService,
              private toast: Md2Toast,
              private _sucursalesService: SucursalesService,) {
                this.isRequired = true;
                this.selectedIndex = 0;
                this.tab1disabled = false
                this.tab2disabled = true;
               }

  ngOnInit() {
    this.getSucursales();
    this.iservicio = {
      IDSERVICIO:null,
      SERVNOMBRE:'',
      SERVACTIVO:'activo',
      IDSUCURSAL:null
    }

    this.servicio = {
      IDSP:null,
      IDPRENDAS:null,
      IDSERVICIO:null,
      SERVNOMBRE:'',
      PNOMBREUNIDAD:'',
      SPCOSTO:null,
      SPDESCUENTO:null,
    }
  }

  postServicio(){
        // this.toastMe();
        this.tab1disabled = true
        this.tab2disabled = false;
        this.selectedIndex = 1;
        this.getprendas();
        this.getlastservicio();

    // this._serviciosService.postServicio(this.iservicio).subscribe(
    //         data => {
    //             this.toastMe();
    //         },

    //         error =>  {
    //             console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
    //              this.errorMessage = <any>error;
    //               if(this.errorMessage != null){
    //               this.failpostSP();
    //           }
    //         });
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

  public getlastservicio(){
    setTimeout(()=>{
          this._serviciosService.getlastservicio().subscribe(
          result => {
              console.log('Último servicio');
              console.log(result);
              this.servicio = result.SERVICIO;
                 this.servicio = {
                    IDSERVICIO:this.servicio[0].IDSERVICIO,
                    IDSP:this.servicio[0].IDSP,
                    IDPRENDAS:this.servicio[0].IDPRENDAS,
                    SERVNOMBRE:this.servicio[0].SERVNOMBRE,
                    PNOMBREUNIDAD:this.servicio[0].PNOMBREUNIDAD,
                    SPCOSTO:this.servicio[0].SPCOSTO,
                    SPDESCUENTO:this.servicio[0].SPDESCUENTO
                  }
              if (!this.servicio.IDSERVICIO) {
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
        },1000);
  }

  public getprendas(){
     this._prendasService.getPrendas().subscribe(
        response => {
            console.log(response);
            this.iprenda = response.PRENDAS;
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
      this._serviciosService.postSP(this.servicio).subscribe(
        data => {
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
