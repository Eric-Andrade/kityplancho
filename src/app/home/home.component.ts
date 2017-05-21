import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "../servicios/servicios.service";
import { Servicios } from '../servicios/servicios';

@Component({
  selector: 'kp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ServiciosService]
})
export class HomeComponent implements OnInit {
 public servicios: Servicios[];
 public errorMessage;

  constructor(private _serviciosService:ServiciosService ) { }

  ngOnInit() {
      this._serviciosService.getServiciosActivos().subscribe(
        result =>{
            console.log(result);
            this.servicios = result.SERVICIOS;
            if(!this.servicios){
                console.log('Error en el servidor...');
            }else{
                console.log('Servicios cargados...')
            }
        },
        error =>{
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
                console.log(this.errorMessage);
                // alert(`Error al conseguir los servicios ${this.errorMessage}`);
            }
        }

      );
  }

}
