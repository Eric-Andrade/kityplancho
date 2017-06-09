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
    this.getServicios();
  }

  getPedido(){
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._pedidosService.getPedido(id).subscribe(
          response => {
            this.pedido = response.PEDIDO;
             console.log('Pedido b');
            console.log(this.pedido)
            this.loading = false;
            this.pedido = {
                  IDPEDIDO:this.pedido[0].IDPEDIDO,
                  PPRECIOTOTAL:this.pedido[0].PPRECIOTOTAL,
                  PSTATUS:`${this.pedido[0].PSTATUS}`,
                  PPAGADO:`${this.pedido[0].PPAGADO}`,
                  PFECHA:`${this.pedido[0].PFECHA}`,
                  PDIRECCIONR:`${this.pedido[0].PDIRECCION_R}`,
                  COORDENADASR: this.pedido[0].COORDENADAS_R,
                  PDIRECCIONE:`${this.pedido[0].PDIRECCION_E}`,
                  COORDENADASE: this.pedido[0].COORDENADAS_E,
                  IDCLIENTE: this.pedido[0].IDCLIENTE,
                      };
            console.log('Pedido');
            console.log(this.pedido)
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
              console.log('Datalles pedido');
              console.log(this.detallepedido)
            this.detallepedido = {
              IDDP:this.detallepedido[0].IDDP,
              DPCANTIDADPRENDAS:this.detallepedido[0].DPCANTIDADPRENDAS,
              IDSP:this.detallepedido[0].IDSP,
              IDPEDIDO:this.detallepedido[0].IDPEDIDO,
              DPCOSTOPEDIDO:this.detallepedido[0].DPCOSTOPEDIDO,
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
        if(!this.pedido) return;
        console.log('Put pedido');
        console.log(this.pedido);
              this._pedidosService.putPedido(this.pedido).subscribe(
              data => {
                    this.toastMe();
                    //console.log(`El cliente ${this.cliente.IDCLIENTE} | ${this.cliente.CNOMBRE} fue actualizado exitosamente!`);

              }, error => {
                  console.warn(`WTF! The error is: ${JSON.stringify(error.json())}`);
                    this.errorMessage = <any>error;
                    if(this.errorMessage != null){
                    this.failinfoputPedido();
                }
              })
  }

  public putServicio(){
        if(!this.detallepedido) return;
        this._pedidosService.putDetallePedido(this.detallepedido).subscribe(
        data => {
            this.toastMe();
            //console.log(`El cliente ${this.cliente.IDCLIENTE} | ${this.cliente.CNOMBRE} fue actualizado exitosamente!`);

        }, error => {
          console.warn(`WTF! The error is: ${JSON.stringify(error.json())}`);
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
            this.failinfoputDetallePedido();
        }
        })
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

    failinfoputPedido(){
      this.toast.toast(`Ocurrió un error al intentar actualizar los datos del pedido ${this.pedido.IDPEDIDO}`);
    }

    failinfoputDetallePedido(){
      this.toast.toast(`Ocurrió un error al intentar actualizar los servicios del pedido ${this.pedido.IDPEDIDO}`);
    }

}
