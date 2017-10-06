// import { ServiciosComponent } from './servicios.component';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { Servicios } from './servicios';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  providers:[ServiciosService]
})
export class ServiciosComponent implements OnInit {
    public loading: boolean;
    public errorMessage;
    public message: boolean;
    public servicios: Servicios[];
    tooltip: string = 'Tooltip!';
    position: string = 'below';
    delay: number = 0;
    userFilter: any = { SERVNOMBRE: '', PNOMBREUNIDAD: ''};
  constructor(private _serviciosService: ServiciosService,
              private _route: ActivatedRoute,
              private _router: Router,
              private toast: Md2Toast,) {
    this.loading = true;
    this.message = false;
  }

  ngOnInit() {
      this._serviciosService.getallsp().subscribe(
        result => {
            this.servicios = result;
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
                this.message = true;
                this.failgetServicios();
            }
        }

      );
  }

failgetServicios() {
      this.toast.toast(`Error al intentar obtener la lista de servicios, intenta recargar la página por favor`);
    }

  getsp(idsp){
      this._router.navigate(['servicios',idsp]);
  }

  getprendas(idprenda){
      this._router.navigate(['servicios/prenda',idprenda]);
  }

  getservicio(idservicio){
    this._router.navigate(['servicios/servicio',idservicio]);
  }
}

