import { IPedido, IDetallePedido } from '../pedido/pedido';
import { Component, OnInit } from '@angular/core';
import { PedidosService } from './pedidos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';
import { ClientesService } from '../../../clientes/clientes.service';
import { Clientes } from '../../../clientes/clientes';

@Component({
  selector: 'kp-pedidodetalle',
  templateUrl: './pedidodetalle.component.html',
  styleUrls: ['./pedidodetalle.component.css'],
  providers:[ PedidosService, ClientesService ]
})
export class PedidodetalleComponent implements OnInit {
  public pedido:IPedido;
  public detallepedido:IDetallePedido[];
  public clientes: Clientes[];
  public errorMessage;
  public message: boolean;
  public loading: boolean;
  public color = 'accent';
  public checked;
  public isRequired: boolean;
  public isDisabled: boolean;
  public _search: string = '';
  constructor(private _pedidosService: PedidosService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _clientesService: ClientesService,
              private toast: Md2Toast) {

              this.loading = true;
              this.isRequired = true;
              this.isDisabled = false;
             }

  ngOnInit() {
    this.getPedido();
    this.getDetallePedido();
    this.getClientes();
  }

  getPedido(){
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._pedidosService.getPedido(id).subscribe(
          response => {
            this.pedido = response.PEDIDO;
            this.loading = false;

            this.pedido = {
                  IDPEDIDO:this.pedido[0].IDPEDIDO,
                  PSTATUS:`${this.pedido[0].PSTATUS}`,
                  PDIRECCIONR:`${this.pedido[0].PDIRECCION_R}`,
                  PDIRECCIONE:`${this.pedido[0].PDIRECCION_E}`,
                  PPRECIOTOTAL:this.pedido[0].PPRECIOTOTAL.valueOf(),
                  PPAGADO:`${this.pedido[0].PPAGADO}`,
                  COORDENADASR: this.pedido[0].COORDENADAS_R,
                  COORDENADASE: this.pedido[0].COORDENADAS_E,
                  IDCLIENTE: this.pedido[0].IDCLIENTE,
                      };

            if(!this.pedido){
                    this._router.navigate(['/pedidos']);
                }
          },
          error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    this.message = true;
                    this.failinfogetCliente();
                }
          }
        );
      });
  }

  getDetallePedido(){
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._pedidosService.getDetallePedido(id).subscribe(
          response => {
            this.detallepedido = response.DPS;
            console.log(this.detallepedido)
            this.loading = false;
                if(!this.detallepedido){
                    this._router.navigate(['/pedidos']);
                }
          },
          error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    this.message = true;
                }
          }
        );
      });
  }

  getClientes(){
        this._clientesService.getClientes().subscribe(
              result =>{
                  this.clientes = result.CLIENTES;
                  if(!this.clientes){
                      console.warn('Error en el servidor...');
                  }else{
                      this.loading = false;
                  }
              },
              error =>{
                  this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                      console.log(this.errorMessage);
                      this.message = true;
                      // this.toastMe();
                  }
              }

            );
  }

  public putPedido(){

  }

  public regresar(){
    this._router.navigate(['pedidos']);
  }

   toastMe() {
      this.toast.toast(`Datos del pedido ${this.pedido.IDPEDIDO} se actualizaron exitosamente`);
    }

    failinfogetCliente() {
      this.toast.toast(`Error al encontrar la información de este pedido, intenta nuevamente por favor`);
    }

}
