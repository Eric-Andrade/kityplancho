import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sucursales } from './sucursales';
import { SucursalesService } from './sucursales.service';

@Component({
  selector: 'kp-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
    public loading: boolean;
    public message: boolean;
    public errorMessage;
    public sucursales: Sucursales[];


  constructor(private _sucursalesService: SucursalesService,
              private _route: ActivatedRoute,
              private _router: Router,) {

                this.loading = true;
                this.message = false;
               }

  ngOnInit() {

    this._sucursalesService.getSucursales().subscribe(
        response => {
            console.log(response);
            this.sucursales = response.SUCURSALES;
            if (!this.sucursales) {
                console.log('Error en el servidor...');
            }else{
                this.loading = false;
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

  getSucursal(idsucursal){
      this._router.navigate(['sucursales',idsucursal]);
  }

}
