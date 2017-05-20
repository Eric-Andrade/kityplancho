import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PedidoService } from "./pedido.service";
// import { Pedido } from "./pedido";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiciosService } from '../../../servicios/servicios.service';
import { Servicios } from '../../../servicios/servicios';
import { SucursalesService } from '../../../sucursales/sucursales.service';
import { Sucursales } from '../../../sucursales/sucursales';

@Component({
  selector: 'kp-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [ PedidoService, ServiciosService, SucursalesService ]
})
export class PedidoComponent implements OnInit {
    opcionpedido: string;
    isRequired: boolean;
    isDisabled: boolean;
    isDisabledMultiple: boolean;
    itemMultiple: any;
    currentServicios: string[];
    public items: Servicios[];
    public sucursales: Sucursales[];
    public errorMessage;
    _search: string = '';

    public loading: boolean;
    public message: boolean;
    autoTicks = true;
    disabled = false;
    invert = false;
    max = 20;
    min = 0;
    showTicks = true;
    step = 1;
    thumbLabel = true;
    value = 0;
    vertical = false;


    constructor(private _pedidoService: PedidoService,
                private _serviciosService: ServiciosService,
                private _sucursalesService: SucursalesService) {

        this.opcionpedido = 'nuevo pedido';
        this.isRequired = true;
        this.isDisabled = false;
        this.isDisabledMultiple = false;
        this.itemMultiple = null;
        this.loading = true;
        this.message = false;

  }

  ngOnInit() {
      this.getServicios();
  }

  getServicios(){
    this._serviciosService.getallsp().subscribe(
        result => {
            console.log(result);
            this.items = result.SP;
            if (!this.items) {
                console.log('Error en el servidor...');
            }else{
                console.log('Servicios cargados para nuevo pedido');
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

  postPedido(){

  }

  postServicio(){

  }

  launchDialog(dialog: any) {
    dialog.open();
  }

  open(dialog: any) {
    dialog.open();
  }

  close(dialog: any) {
    dialog.close();
  }

   get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : null;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 5;
}
