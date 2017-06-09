import { Component, OnInit } from '@angular/core';
import { PedidoComponent } from '../pedido/pedido.component';

@Component({
  selector: 'kp-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
title: string;
secciones: Array<string>;


  constructor() {
      this.title = 'KityPlancho';
      this.secciones = ['pedidos', 'servicios', 'clientes', 'empleados', 'ayuda'];
  }

  ngOnInit() {
  }

}
