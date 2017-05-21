import { Component, OnInit } from '@angular/core';
import { PedidosService } from './pedidos.service';
import { Pedidos } from './pedidos';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
    public errorMessage;
    public pedidos: Pedidos[];
    public loading: boolean;
    public message: boolean;

  constructor(private _pedidosService: PedidosService,
              private toast: Md2Toast) {
    this.loading = true;
    this.message = false;
  }

  ngOnInit() {
      this._pedidosService.getpdp().subscribe(
        result => {
            console.log(result);
            this.pedidos = result.GETPDP;
            if (!this.pedidos ) {
                console.warn('Error en el servidor...');
            }else{
                this.loading = false;
            }
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null ) {
                console.log(`This is the error: ${this.errorMessage}`);
                this.message = true;
                this.failgetPedidos();
            }
        }

      );
  }

failgetPedidos() {
      this.toast.toast(`Algo falló al intentar obtener la lista de pedidos, intenta de nuevo por favor`);
    }
}
