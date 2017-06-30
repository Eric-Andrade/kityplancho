import { Component, OnInit } from '@angular/core';
import { IPrendas } from '../../servicios';
import { PrendasService } from '../prendas.service';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-prenda',
  templateUrl: './prenda.component.html',
  styleUrls: ['./prenda.component.css'],
  providers: [ PrendasService ]
})
export class PrendaComponent implements OnInit {
  public prenda: IPrendas;
  public errorMessage;

  constructor(private _prendasService: PrendasService,
              private toast: Md2Toast,) { }

  ngOnInit() {
    this.prenda = {
        IDPRENDAS:null,
        PNOMBREUNIDAD:'',
        PDESCRIPCION:'',
    }
  }

  postPrenda(){
    if(this.prenda.PDESCRIPCION == '' || this.prenda.PDESCRIPCION == null){
      this.prenda.PDESCRIPCION = 'En espera de descripción';
    }else{
      this.prenda.PDESCRIPCION = this.prenda.PDESCRIPCION;
    }
    this._prendasService.postPrenda(this.prenda).subscribe(
            data => {
                this.toastMe();
            },
            error =>  {
                console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
                 this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                  this.failpostPrenda();
              }
            });
  }

   toastMe() {
     this.toast.toast(`Nueva prenda creada exitosamente`);
  }

  failpostPrenda() {
     this.toast.toast(`Ocurrió un problema al intentar crear un nueva prenda. Recarga la página por favor`);
  }

}
