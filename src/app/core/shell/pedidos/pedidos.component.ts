import { Component, OnInit } from '@angular/core';
import { PedidosService } from './pedidos.service';
import { Pedidos } from './pedidos';

@Component({
  selector: 'kp-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
    public errorMessage;
    public pedidos: Pedidos[];
    public loading: boolean;

  constructor(private _pedidosService: PedidosService) {
    this.loading = true;
  }

  ngOnInit() {
      this._pedidosService.getpdp().subscribe(
        result => {
            console.log(result);
            this.pedidos = result.GETPDP;
            if (!this.pedidos ) {
                console.log('Error en el servidor...');
            }else{
                this.loading = false;
            }
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null ) {
                console.log(`This is the error: ${this.errorMessage}`);
                alert('Error al conseguir los pedidos');
            }
        }

      );
  }

}
