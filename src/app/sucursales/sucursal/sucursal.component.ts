import { SucursalesService } from '../sucursales.service';
import { Sucursales } from '../sucursales';
import { Component, OnInit } from '@angular/core';
import { Md2Toast } from 'md2';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  public lastesucursal: number;
  public loading: boolean;
  public message: boolean;
  constructor(private _sucursalService: SucursalesService,
              private toast: Md2Toast,
              private _route:ActivatedRoute,
              private _router:Router,) {

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

getlastsucursal(){
   setTimeout(()=>{
      this._sucursalService.getlastSucursal().subscribe(
        result =>{
              this.lastesucursal = result.ULTIMASUCURSAL[0].IDSUCURSAL;
              console.log('último sucursal');
              console.log(this.lastesucursal);
              if(!this.lastesucursal){
                  console.log('Error en el servidor...');
              }else{

              }
          },
          error =>{
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  this.message = true;
                  this.toastMe();
              }
          }
    )
   },500)
  }


  public postSucursal(){
     this._sucursalService.postSucursal(this.sucursal).subscribe(
            data => {
                this.toastMe();
                this.getlastsucursal();
                setTimeout(()=>{
                 let idsucursal = this.lastesucursal;
                     this._router.navigate(['sucursales',idsucursal]);
                     console.log('enviar al sucursal desde el post');
               },2000);
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
