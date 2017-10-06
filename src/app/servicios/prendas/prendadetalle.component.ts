import { IPrendas } from '../servicios';
import { Component, OnInit } from '@angular/core';
import { PrendasService } from './prendas.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-prendadetalle',
  templateUrl: './prendadetalle.component.html',
  styleUrls: ['./prendadetalle.component.css'],
  providers:[ PrendasService ]
})
export class PrendadetalleComponent implements OnInit {
  public prenda: IPrendas;
  public loading: boolean;
  public errorMessage;
  public message: boolean;

  constructor(private _prendasService: PrendasService,
            private _route: ActivatedRoute,
            private _router: Router,
            private toast: Md2Toast) {
              this.loading = true;
              this.message = false;
  }
  ngOnInit() {

    this.getPrenda();
  }

  getPrenda() {
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._prendasService.getPrenda(id).subscribe(
          response => {
            this.prenda = response;
            this.loading = false;
            this.prenda = {     ID:this.prenda.ID,
                                PNOMBREUNIDAD:`${this.prenda.PNOMBREUNIDAD}`,
                                PDESCRIPCION:`${this.prenda.PDESCRIPCION}`,
                              };
          if(this.prenda.PDESCRIPCION == null){
            this.prenda.PDESCRIPCION = ' ';
          }
                if(!this.prenda){
                    this._router.navigate(['/servicios']);
                }
          },
          error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log('Whop!'+this.errorMessage);
                    this.message = true;
                    this.failinfogetPrenda();
                }
          }
        );
      });
    }

  putPrenda(){
       // tslint:disable-next-line:curly
       if (!this.prenda) return;

                this._prendasService.putPrenda(this.prenda).subscribe(
                data => {
                     this.toastMe();
                     // console.log(`El cliente ${this.cliente.IDCLIENTE} | ${this.cliente.CNOMBRE} fue actualizado exitosamente!`)

                }, error => {
                    console.warn(`WTF! The error is: ${JSON.stringify(error.json())}`);
                     this.errorMessage = <any>error;
                      if (this.errorMessage != null) {
                      this.failinfoputCliente();
                  }
                });
  }

   failinfogetPrenda() {
      this.toast.toast(`Error al encontrar la información de esta prenda, intenta nuevamente por favor`);
    }

  toastMe() {
      this.toast.toast(`Datos de
      ${this.prenda.PNOMBREUNIDAD} actualizados exitosamente`);
    }
 failinfoputCliente() {
      this.toast.toast(`Error al actualizar la información de ${this.prenda.PNOMBREUNIDAD}, intenta nuevamente por favor`);
    }
    regresar(){
      this._router.navigate(['servicios']);
  }


}
