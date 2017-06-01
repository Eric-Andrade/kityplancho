import { ServiciosService } from '../../../servicios/servicios.service';
import { Servicios } from '../../../servicios/servicios';
import { IDetallePedidos, IDetallePedido, IPedido, ISP } from '../pedido/pedido';
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
  providers:[ PedidosService, ClientesService, ServiciosService ]
})
export class PedidodetalleComponent implements OnInit {
  public pedido:IPedido;
  public detallepedidos:IDetallePedidos[];
  public detallepedido:IDetallePedido;
  public clientes: Clientes[];
  public items: Servicios;
  public errorMessage;
  public message: boolean;
  public loading: boolean;
  public color = 'accent';
  public checked;
  public isRequired: boolean;
  public isDisabled: boolean;
  public _search: string = '';
  public autoTicks = true;
  public disabled = false;
  public invert = false;
  public max = 20;
  public min = 0;
  public showTicks = true;
  public step = 1;
  public thumbLabel = true;
  public value = 0;
  public vertical = false;
  public sp: ISP;

  constructor(private _pedidosService: PedidosService,
              private _serviciosService: ServiciosService,
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
        this._pedidosService.getDetallePedidos(id).subscribe(
          response => {
            this.detallepedidos = response.DPS;
            console.log(this.detallepedidos)
            this.loading = false;
                if(!this.detallepedidos){
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

  getServicios(){
    this._serviciosService.getallsp().subscribe(
        result => {
            this.items = result.SP;
            this.sp = {
              IDSP:this.items.IDSP,
              SPCOSTO:this.items.SPCOSTO,
              SPDESCUENTO:this.items.SPDESCUENTO,
            }
            if (!this.items) {
                console.log('Error en el servidor...');
            }else{
            }
        },
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null ) {
                console.log(this.errorMessage);

            }
        }

      );
  }

    getdp(id){
       this._pedidosService.getDetallePedido(id).subscribe(
          response => {
            this.detallepedido = response.DP;
            console.log(this.detallepedido)
            this.detallepedido = {
              IDDP:this.detallepedido[0].IDDP,
              DP_CANTIDADPRENDAS:this.detallepedido[0].DP_CANTIDADPRENDAS,
              IDSP:this.detallepedido[0].IDSP,
              IDPEDIDO:this.detallepedido[0].IDPEDIDO,
              DP_COSTOPEDIDO:this.detallepedido[0].DP_COSTOPEDIDO,
            }
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
  }

  public putPedido(){

  }

  public putServicio(){

  }

  public regresar(){
    this._router.navigate(['pedidos']);
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : null;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 5;

   toastMe() {
      this.toast.toast(`Datos del pedido ${this.pedido.IDPEDIDO} se actualizaron exitosamente`);
    }

    failinfogetCliente() {
      this.toast.toast(`Error al encontrar la información de este pedido, intenta nuevamente por favor`);
    }

}
