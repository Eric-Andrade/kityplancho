import { Component, OnInit } from '@angular/core';
import { IServicios, SP } from './servicios'
import { ServiciosService } from './servicios.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';
import { SucursalesService } from '../sucursales/sucursales.service';
import { Sucursales } from '../sucursales/sucursales';

@Component({
  selector: 'kp-servicioprendas',
  templateUrl: './servicioprendas.component.html',
  styleUrls: ['./servicioprendas.component.css'],
  providers: [ServiciosService, SucursalesService]
})
export class ServicioprendasComponent implements OnInit {
 public servicio: IServicios;
    public loading: boolean;
    public errorMessage;
    public message: boolean;
    public sucursales: Sucursales[];
    public isRequired: boolean;
    public isDisabled: boolean;
    public servicioprendas:SP;
  constructor(private _serviciosService: ServiciosService,
              private _sucursalesService: SucursalesService,
              private _route: ActivatedRoute,
              private _router: Router,
              private toast: Md2Toast) {
              this.loading = true;
              this.message = false;
  }

  ngOnInit() {
    this.getServicio();
    this.getSP();

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

  getServicio() {
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._serviciosService.getServicio(id).subscribe(
          response => {
            this.servicio = response.SERVICIO;
            console.log('get servicio');
            console.log(this.servicio);
            this.loading = false;
            this.servicio = {   IDSERVICIO:this.servicio[0].IDSERVICIO,
                                SERVNOMBRE:`${this.servicio[0].SERVNOMBRE}`,
                                SERVACTIVO:`${this.servicio[0].SERVACTIVO}`,
                                IDSUCURSAL:this.servicio[0].SUCURSAL,
                              };
                if(!this.servicio){
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
    if(!this.servicio) return;
        this._serviciosService.putServicio(this.servicio).subscribe(
        data => {
              this.toastMe();
              //console.log(`El cliente ${this.cliente.IDCLIENTE} | ${this.cliente.CNOMBRE} fue actualizado exitosamente!`)

        }, error => {
            console.warn(`WTF! The error is: ${JSON.stringify(error.json())}`);
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
              this.failinfoputCliente();
          }
        });
  }

  getSP(){
    this._route.params.forEach((params: Params) => {
            let id = params['id'];
      this._serviciosService.getSP(id).subscribe(
        response =>{
          this.servicioprendas = response.SERVICIOPRENDAS;
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

  failinfogetPrenda() {
      this.toast.toast(`Error al encontrar la información de esta prenda, intenta nuevamente por favor`);
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
}
