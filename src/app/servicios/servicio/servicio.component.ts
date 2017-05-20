import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IServicios, IPrendas } from '../servicios';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
  providers:[ServiciosService]
})
export class ServicioComponent implements OnInit {
  public opcionservicio: string;
  public opcionprenda:string;
  public servicio: IServicios;
  public prenda: IPrendas;
  tooltip: string = 'Tooltip!';
  position: string = 'below';
  delay: number = 0;

  constructor(private _serviciosService: ServiciosService,
              private _route: ActivatedRoute,
              private _router: Router,
              private toast: Md2Toast) {
    this.opcionservicio = 'Nuevo servicio';
        this.opcionprenda = 'Nueva prenda';
  }

  ngOnInit() {
    this.servicio = { IDSERVICIO:null, SERVNOMBRE:'', SERVACTIVO:'', IDSUCURSAL:null}
    this.prenda = { IDPRENDA:null, PNOMBREUNIDAD:'', PDESCRIPCION:''}
  }

  postServicio(){

  }

   open(dialog: any) {
    dialog.open();
  }

  close(dialog: any) {
    dialog.close();
  }


  toastMe() {
      this.toast.toast(`El servicio
      ${this.servicio.SERVNOMBRE} fue guardado exitosamente`);
    }
}
