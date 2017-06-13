import { Component, OnInit } from '@angular/core';
import { Servicios } from './servicios'
import { ServiciosService } from './servicios.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-serviciodetalle',
  templateUrl: './serviciodetalle.component.html',
  styleUrls: ['./serviciodetalle.component.css'],
  providers: [ServiciosService]
})
export class ServiciodetalleComponent implements OnInit {
    public servicio: Servicios;
    public errorMessage;
    public message: boolean;
    public loading: boolean;
    constructor(private _serviciosService: ServiciosService,
                private _route: ActivatedRoute,
                private _router: Router,
                private toast: Md2Toast,){

                  this.loading = true;
    }
    ngOnInit() {
      this.getServicio();
    }

    getServicio(){
      this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._serviciosService.getServicio(id).subscribe(
          response => {
            this.servicio = response.SERVICIO;
            console.log('get servicio');
            console.log(this.servicio);
            this.loading = false;
            this.servicio = {
                      IDSP:this.servicio[0].IDSP,
                      IDPRENDAS:this.servicio[0].IDPRENDAS,
                      IDSERVICIO:this.servicio[0].IDSERVICIO,
                      SERVNOMBRE:this.servicio[0].SERVNOMBRE,
                      PNOMBREUNIDAD:this.servicio[0].PNOMBREUNIDAD,
                      SPCOSTO:this.servicio[0].SPCOSTO,
                      SPDESCUENTO:this.servicio[0].SPDESCUENTO,
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

    }

    failinfogServicio() {
      this.toast.toast(`Error al encontrar la información de este servicio, intenta nuevamente por favor`);
    }

    regresar(){
      this._router.navigate(['servicios']);
    }
}
