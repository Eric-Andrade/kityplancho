import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kp-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
    opcionpedido: string;
    isRequired: boolean;
    isDisabled: boolean;
    isDisabledMultiple: boolean;
    itemMultiple: any;
    item: any;
    items: Array<any>;
    currentServicios: string[];
    
    constructor() {
        this.opcionpedido = 'nuevo pedido';
        this.isRequired = true;
        this.isDisabled = false;
        this.isDisabledMultiple = false;
        this.itemMultiple = null;
        this.item = null;
     /*   this.items =
          [
            { name: 'Lavado', value: '1' },
            { name: 'Planchado', value: '2' },
            { name: 'Tintado', value: '3' },
          ];*/
  }

  ngOnInit() {
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
