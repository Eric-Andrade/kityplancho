import { Component, OnInit } from '@angular/core';
import { IServicios, SP, SPone, IPrendas } from './servicios'
import { ServiciosService } from './servicios.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';
import { SucursalesService } from '../sucursales/sucursales.service';
import { Sucursales } from '../sucursales/sucursales';
import { PrendasService } from './prendas/prendas.service';

@Component({
  selector: 'kp-servicioprendas',
  templateUrl: './servicioprendas.component.html',
  styleUrls: ['./servicioprendas.component.css'],
  providers: [ServiciosService, SucursalesService, PrendasService]
})
export class ServicioprendasComponent implements OnInit {
 public servicio: IServicios;
 public iprenda: IPrendas[];
    public loading: boolean;
    public errorMessage;
    public message: boolean;
    public sucursales: Sucursales[];
    public isRequired: boolean;
    public isDisabled: boolean;
    public servicioprendas: SP;
    public spone: SPone;
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
              private _sucursalesService: SucursalesService,
              private _route: ActivatedRoute,
              private _router: Router,
              private toast: Md2Toast) {
              this.loading = true;
              this.message = false;
  }

  ngOnInit() {
    this.spone = {
      IDPRENDAS: null,
      IDSERVICIO: null,
      IDSP: null,
      SPCOSTO: null,
      SPDESCUENTO: 0,
    }
    this.getprendas();
    this.getServicio();
    this.getSP();

    this._sucursalesService.getSucursales().subscribe(
        response => {
            console.log(response);
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

  getServicio() {
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._serviciosService.getServicio(id).subscribe(
          response => {
            this.servicio = response;
            console.log('get servicio');
            console.log(this.servicio);
            this.loading = false;
            this.servicio = {   ID: this.servicio.ID,
                                SERVNOMBRE: `${this.servicio.SERVNOMBRE}`,
                                SERVACTIVO: `${this.servicio.SERVACTIVO}`,
                                IDSUCURSAL: this.servicio.IDSUCURSAL,
                              };
                if (!this.servicio) {
                    this._router.navigate(['/servicios']);
                }
          },
          error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    this.message = true;
                    this.failinfogetPrenda();
                }
          }
        );
      });
    }

  putServicio(){
    // tslint:disable-next-line:curly
    if (!this.servicio) return;
        this._serviciosService.putServicio(this.servicio).subscribe(
        data => {
              this.toastMe();
              // console.log(`El cliente ${this.cliente.IDCLIENTE} | ${this.cliente.CNOMBRE} fue actualizado exitosamente!`)

        }, error => {
            console.warn(`WTF! The error is: ${JSON.stringify(error.json())}`);
              this.errorMessage = <any>error;
              if(this.errorMessage != null) {
              this.failinfoputCliente();
          }
        });
  }

  getSP(){
    this._route.params.forEach((params: Params) => {
            let id = params['id'];
      this._serviciosService.getSP(id).subscribe(
        response =>{
          this.servicioprendas = response;
          this.loading = false;
          console.log('Este es SP');
          console.log(this.servicioprendas);
        },
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    this.message = true;
                    this.failgetServicio();
                }
              }
            );
        });
    }

  
   getprendas(){
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

   
   postSP(){
     this.spone.IDSERVICIO = this.servicio.ID;
     console.log('Servicio!!!!');
            console.log(this.spone);
      this._serviciosService.postSP(this.spone).subscribe(
        data => {
            this.getSP();
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

  eliminarsp(idsp){
this._serviciosService.eliminarsp(idsp).subscribe(
  success=>{
    this.getSP();
    this.eliminarspsuccess();
  },
  error =>{
    console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
              this.faileliminarsp();
          }
  }
)
  }

  postServiciotoast() {
      this.toast.toast(`Prenda vinculada al servicio`);
  }

  failpostSP() {
     this.toast.toast(`Ocurrió un problema al intentar crear un nuevo servicio. Recarga la página por favor`);
  }

  failinfogetPrenda() {
      this.toast.toast(`Error al encontrar la información de esta prenda, intenta nuevamente por favor`);
  }

  eliminarspsuccess(){
     this.toast.toast(`Prenda eliminada del servicio`);
  }

  faileliminarsp(){
    this.toast.toast(`Error al tratar de eliminar esta prenda, intenta nuevamente por favor`);
  }

  toastMe() {
      this.toast.toast(`Datos de ${this.servicio.SERVNOMBRE} actualizados exitosamente`);
  }

  failinfoputCliente() {
      this.toast.toast(`Error al actualizar la información de ${this.servicio.SERVNOMBRE}, intenta nuevamente por favor`);
  }
  regresar(){
    this._router.navigate(['servicios']);
  }

  failgetServicio() {
          this.toast.toast('Error al encontrar la información de este servicio, intenta nuevamente por favor');
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : null;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 5;
}
