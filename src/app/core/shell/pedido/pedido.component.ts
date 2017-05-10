import { ServiciosService } from '../../../servicios/servicios.service';
import { Servicios } from '../../../servicios/servicios';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PedidoService } from "./pedido.service";
import { Pedido } from "./pedido";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'kp-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [PedidoService, ServiciosService ]
})
export class PedidoComponent implements OnInit {
    opcionpedido: string;
    isRequired: boolean;
    isDisabled: boolean;
    isDisabledMultiple: boolean;
    itemMultiple: any;
    currentServicios: string[];
    public items: Servicios[];
    public errorMessage;
    _search: string = '';

    constructor(private _pedidoService: PedidoService, private _serviciosService: ServiciosService) {
        this.opcionpedido = 'nuevo pedido';
        this.isRequired = true;
        this.isDisabled = false;
        this.isDisabledMultiple = false;
        this.itemMultiple = null;

  }

  ngOnInit() {
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

  postPedido(){

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

  openAlert(event: Event) { }

  openConfirm(event: Event) { }

  openPrompt(event: Event) { }

  openAdvanced(event: Event) { }

  openTabDialog(event: Event) { }

}
