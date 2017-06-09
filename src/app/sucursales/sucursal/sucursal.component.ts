import { SucursalesService } from '../sucursales.service';
import { Sucursales } from '../sucursales';
import { Component, OnInit } from '@angular/core';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
  providers:[SucursalesService]
})
export class SucursalComponent implements OnInit {
  public sucursal: Sucursales;
  public opcionsucursal:string = 'nueva sucursal';
  public errorMessage;
  constructor(private _sucursalService: SucursalesService,
              private toast: Md2Toast) {

  }

  ngOnInit() {
    this.sucursal = {
      IDSUCURSAL:null,
      SNOMBRE:'',
      SDIRECCION:'',
      SEMAIL:'',
      STELEFONO:'',
      SESTADO:'',
      SMUNICIPIO:'',
      SLOCALIDAD:'',
      SHORARIO:'',
      ACTIVO:'activo',
    }
  }

  public postSucursal(){
     this._sucursalService.postSucursal(this.sucursal).subscribe(
            data => {
                this.toastMe();
            },

            error =>  {
                console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
                 this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                  this.failpostSucursal();
              }
            });
  }

  toastMe() {
        this.toast.toast(`Nueva sucursal creada exitosamente`);
  }

  failpostSucursal() {
        this.toast.toast(`Ocurrió un problema al intentar crear una nueva sucursal. Recarga la página por favor`);
  }
}
