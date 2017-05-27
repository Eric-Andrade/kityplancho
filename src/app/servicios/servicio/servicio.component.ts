import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Servicios, IServicios, IPrendas } from '../servicios';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { Md2Toast } from 'md2';
import { SucursalesService } from '../../sucursales/sucursales.service';
import { Sucursales } from '../../sucursales/sucursales';

@Component({
  selector: 'kp-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
  providers:[ServiciosService, SucursalesService]
})
export class ServicioComponent implements OnInit {
  public opcionservicio: string;
  public opcionprenda:string;
  public sp: Servicios;
  public servicio: IServicios;
  public sucursales: Sucursales[];
  public prenda: IPrendas[];
  public errorMessage;
  public message: boolean;
  public isRequired: boolean;
  public isDisabled: boolean;
  public isDisabledMultiple: boolean;
  public itemMultiple: any;
  tooltip: string = 'Tooltip!';
  position: string = 'below';
  delay: number = 0;
  tab1disabled: boolean;
  tab2disabled: boolean;
  selectedIndex: number;


  constructor(private _serviciosService: ServiciosService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _sucursalesService: SucursalesService,
              private toast: Md2Toast) {

        this.opcionservicio = 'Nuevo servicio';
        this.opcionprenda = 'Nueva prenda';
        this.isRequired = true;
        this.isDisabled = false;
        this.isDisabledMultiple = false;
        this.itemMultiple = null;
        this.tab1disabled = false
        this.tab2disabled = true;
  }

  ngOnInit() {
    this.sp = {IDSP:null,IDPRENDAS:null,IDSERVICIO:null,SPCOSTO:null,SPDESCUENTO:null}
    this.servicio = { IDSERVICIO:null, SERVNOMBRE:'', SERVACTIVO:'', IDSUCURSAL:null}
    // this.prenda = { IDPRENDA:null, PNOMBREUNIDAD:'', PDESCRIPCION:''}
    this.getSucursales();
    this.getPrendas();
  }

  postServicio(){
        this.tab1disabled = true
        this.tab2disabled = false;
        this.selectedIndex = 1;
  }

  postPrenda(){

    this.postPrendatoast();
  }

  getPrendas(){
    this._serviciosService.getPrendas().subscribe(
        response => {
            this.prenda = response.PRENDAS;

            if (!this.prenda) {
                console.log('Error en el servidor...');
            }else{

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

  getSucursales(){
        this._sucursalesService.getSucursales().subscribe(
          response => {
              console.log(response);
              this.sucursales = response.SUCURSALES;
              if (!this.sucursales) {
                  console.log('Error en el servidor...');
              }else{
                  console.log('Sucursales cargadas correctamente');
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

  postPrendatoast() {
      this.toast.toast(`La prenda añadida a ${this.servicio.SERVNOMBRE}`);
    }
}
