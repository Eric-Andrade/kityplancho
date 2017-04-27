// import { ServiciosComponent } from './servicios.component';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { Servicios } from './servicios';

@Component({
  selector: 'kp-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
    public loading: boolean;
    public errorMessage;
    public servicios: Servicios[];
  constructor(private _serviciosService: ServiciosService) {
    this.loading = true;
  }

  ngOnInit() {
      this._serviciosService.getServicios().subscribe(
        result => {
            console.log(result);
            this.servicios = result.DETALLESSERVICIOS;
            if (!this.servicios ) {
                console.log('Error en el servidor...');
            }else{
                this.loading = false;
            }
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null ) {
                console.log(this.errorMessage);
                alert('Error al conseguir los servicios');
            }
        }

      );
  }

}

