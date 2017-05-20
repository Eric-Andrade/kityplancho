// import { ServiciosComponent } from './servicios.component';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { Servicios } from './servicios';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'kp-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  providers:[ServiciosService]
})
export class ServiciosComponent implements OnInit {
    public loading: boolean;
    public errorMessage;
    public servicios: Servicios[];
    tooltip: string = 'Tooltip!';
    position: string = 'below';
    delay: number = 0;

  constructor(private _serviciosService: ServiciosService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.loading = true;
  }

  ngOnInit() {
      this._serviciosService.getallsp().subscribe(
        result => {
            console.log(result);
            this.servicios = result.SP;
            if (!this.servicios) {
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

