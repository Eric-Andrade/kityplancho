import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';
import { SucursalesService } from './sucursales.service';
import { Sucursales } from './sucursales';
@Component({
  selector: 'kp-sucursaldetalle',
  templateUrl: './sucursaldetalle.component.html',
  styleUrls: ['./sucursaldetalle.component.css'],
  providers: [SucursalesService]
})
export class SucursaldetalleComponent implements OnInit {
    public sucursal: Sucursales;
    public errorMessage;
    public message: boolean;
    public loading: boolean;
  constructor(private _route: ActivatedRoute,
            private _router: Router,
            private toast: Md2Toast,
            private _sucursalesService: SucursalesService,) {
              this.loading = true; }

  ngOnInit() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._sucursalesService.getSucursal(id).subscribe(
              response => {
                    this.sucursal = response;
                    this.loading = false;
                    this.sucursal = {
                        ID:this.sucursal.ID,
                        SNOMBRE:this.sucursal.SNOMBRE,
                        SDIRECCION:this.sucursal.SDIRECCION,
                        SEMAIL:this.sucursal.SEMAIL,
                        STELEFONO:this.sucursal.STELEFONO,
                        SESTADO:this.sucursal.SESTADO,
                        SMUNICIPIO:this.sucursal.SMUNICIPIO,
                        SLOCALIDAD:this.sucursal.SLOCALIDAD,
                        SHORARIO:this.sucursal.SHORARIO,
                        ACTIVO:this.sucursal.ACTIVO,
                    };
                    console.log('Sucursal');
                    console.log(this.sucursal);
                    if(!this.sucursal){
                    this._router.navigate(['/sucursales']);
                    }
              },
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    this.message = true;
                    this.failgetSucursal();
                }
              }
            );
        });
  }

  putSucursal(){
    if(!this.sucursal) return;
          this._sucursalesService.putSucursal(this.sucursal).subscribe(
          data => {
              console.log(this.sucursal);
               this.toastMe();
               this._router.navigate(['/sucursales', this.sucursal.ID]);

          }, error => {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                this.failputSucursal();
            }
          })
  }


  regresar(){
      this._router.navigate(['sucursales']);
  }

  toastMe() {
          this.toast.toast(`Datos de ${this.sucursal.SNOMBRE} actualizados exitosamente`);
        }

  failgetSucursal() {
        this.toast.toast('Error al encontrar la información de esta sucursal, intenta nuevamente por favor');
          }

  failputSucursal(){
        this.toast.toast(`Error al actualizar la información de
        ${this.sucursal.SNOMBRE}, intenta nuevamente por favor`);
  }
}
