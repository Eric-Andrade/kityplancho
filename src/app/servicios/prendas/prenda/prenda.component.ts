import { Component, OnInit } from '@angular/core';
import { IPrenda } from '../../servicios';
import { PrendasService } from '../prendas.service';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-prenda',
  templateUrl: './prenda.component.html',
  styleUrls: ['./prenda.component.css'],
  providers: [ PrendasService ]
})
export class PrendaComponent implements OnInit {
  public prenda: IPrenda;
  public errorMessage;

  constructor(private _prendasService: PrendasService,
              private toast: Md2Toast,) { }

  ngOnInit() {
    this.prenda = {
        IDPRENDA:null,
        PNOMBREUNIDAD:'',
        PDESCRIPCION:'',
    }
  }

  postPrenda(){
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
     this.toast.toast(`Nueva creada exitosamente`);
  }

  failpostPrenda() {
     this.toast.toast(`Ocurrió un problema al intentar crear un nueva nueva prenda. Recarga la página por favor`);
  }

}
