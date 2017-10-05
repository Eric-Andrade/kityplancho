import { PrendasService } from './prendas/prendas.service';
import { Component, OnInit } from '@angular/core';
import { IPrendas, Servicios, SPone } from './servicios';
import { ServiciosService } from './servicios.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-serviciodetalle',
  templateUrl: './serviciodetalle.component.html',
  styleUrls: ['./serviciodetalle.component.css'],
  providers: [ServiciosService, PrendasService]
})
export class ServiciodetalleComponent implements OnInit {
    public servicio: SPone;
    public errorMessage;
    public message: boolean;
    public loading: boolean;
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
    public isRequired: boolean;
    public isDisabled: boolean;
    public items: Servicios;
    public iprenda: IPrendas[];

    constructor(private _serviciosService: ServiciosService,
                private _prendasService: PrendasService,
                private _route: ActivatedRoute,
                private _router: Router,
                private toast: Md2Toast,){

                  this.loading = true;
    }
    ngOnInit() {
      this.getSP();
      this._serviciosService.getservicios().subscribe(
        result => {
            this.items = result;
            if (!this.items) {
                console.log('Error en el servidor...');
            }else{
            }
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null ) {
                console.log(this.errorMessage);
            }
        }
      );

      this._prendasService.getPrendas().subscribe(
        response => {
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

    getSP(){
      this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._serviciosService.getoneSP(id).subscribe(
          response => {
            this.servicio = response;
            console.log('get servicio');
            console.log(this.servicio);
            this.loading = false;
            this.servicio = {
                      IDPRENDAS:this.servicio[0].IDPRENDAS,
                      IDSERVICIO:this.servicio[0].IDSERVICIO,
                      IDSP:this.servicio[0].IDSP,
                      SPCOSTO:this.servicio[0].SPCOSTO,
                      SPDESCUENTO:this.servicio[0].SPDESCUENTO
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
                    this.failinfogServicio();
                }
          }
        );
      });
    }

    putServicio(){
      // tslint:disable-next-line:curly
      if (!this.servicio) return;
          this._serviciosService.putoneSP(this.servicio).subscribe(
          data => {
              console.log(this.servicio);
               this.toastMe();

          }, error => {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                this.failputEmpleado();
            }
          })
    }

    toastMe() {
          this.toast.toast(`Datos del servicio
          actualizados exitosamente`);
        }

    failinfogServicio() {
      this.toast.toast(`Error al encontrar la información de este servicio, intenta nuevamente por favor`);
    }

    failputEmpleado() {
          this.toast.toast(`Error al actualizar la información del servicio #${this.servicio.IDSERVICIO}, intenta nuevamente por favor`);
        }

    regresar(){
      this._router.navigate(['servicios']);
    }

    get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : null;
    }

    set tickInterval(v) {
      this._tickInterval = Number(v);
    }
    private _tickInterval = 5;
}
