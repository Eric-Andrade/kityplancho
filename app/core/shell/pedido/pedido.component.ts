import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PedidoService } from "./pedido.service";
import { IPedido, IDetallePedidos, ISP } from "./pedido";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiciosService } from '../../../servicios/servicios.service';
import { Servicios } from '../../../servicios/servicios';
import { SucursalesService } from '../../../sucursales/sucursales.service';
import { Sucursales } from '../../../sucursales/sucursales';
import { ClientesService } from '../../../clientes/clientes.service';
import { Clientes } from '../../../clientes/clientes';

import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [ PedidoService, ServiciosService, SucursalesService, ClientesService ]
})
export class PedidoComponent implements OnInit {
    public opcionpedido: string;
    public isRequired: boolean;
    public isDisabled: boolean;
    public isDisabledMultiple: boolean;
    public itemMultiple: any;
    public currentServicios: string[];
    public items: Servicios;
    public sucursales: Sucursales[];
    public clientes: Clientes[];
    public errorMessage;
    public pedido: IPedido;
    public detallepedido: IDetallePedidos;
    public sp: ISP;
    public _search: string = '';
    public tab1disabled: boolean;
    public tab2disabled: boolean;
    public tab3disabled: boolean;
    public selectedIndex: number;
    public next: boolean;
    public spcosto: number;
    public loading: boolean;
    public message: boolean;
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

    constructor(private _pedidoService: PedidoService,
                private _serviciosService: ServiciosService,
                private _sucursalesService: SucursalesService,
                private _clientesService: ClientesService,
                private toast: Md2Toast,
                private _route: ActivatedRoute,
                private _router: Router,) {

        this.opcionpedido = 'nuevo pedido';
        this.isRequired = true;
        this.isDisabled = false;
        this.isDisabledMultiple = false;
        this.itemMultiple = null;
        this.loading = true;
        this.message = false;
        this.selectedIndex = 0;
        this.tab1disabled = false;
        this.tab2disabled = true;
        this.tab3disabled = true;
        this.next = true;
  }

  ngOnInit() {
  this.pedido = {
      IDPEDIDO:0,
      PSTATUS:'en_camino',
      PDIRECCIONR:'1Av. Gral. Lazaro Cardenas 210B, Zona Centro, 34000 Durango, Dgo., Mexico',
      PDIRECCIONE:'2Av. Gral. Lazaro Cardenas 210B, Zona Centro, 34000 Durango, Dgo., Mexico',
      PPRECIOTOTAL:0,
      PPAGADO:'contraentrega',
      COORDENADASR:'',
      COORDENADASE:'',
      IDCLIENTE:null,
  }

  this.detallepedido = {
      IDDP:null,
      CANTIDAD:null,
      IDSP:null,
      IDPEDIDO:null,
      COSTO:0,
  };

  this.sp ={
      IDSP:null,
      SPCOSTO:null,
      SPDESCUENTO:null,
  }
      this.getServicios();
      this.getClientes();

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

    getlastpedido(){
        setTimeout(()=>{
          this._pedidoService.getlastpedido().subscribe(
          result => {
              console.log('Último pedido');
              console.log(result);
              this.detallepedido = result.PEDIDO;
              this.detallepedido = {
                IDPEDIDO:this.detallepedido[0].IDPEDIDO,
                IDDP:this.detallepedido[0].IDDP,
                CANTIDAD:this.detallepedido[0].CANTIDAD,
                IDSP:this.detallepedido[0].IDSP,
                COSTO:this.detallepedido[0].COSTO
              }
              if (!this.detallepedido.IDPEDIDO) {
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
                  this.failgetLastPedido();
              }
          }

        );
        },1000);
    }

    postPedido(){
                this.getlastpedido();

                // this.tab1disabled = true;
                // this.tab2disabled = false;
                // this.tab3disabled = true;
                // this.selectedIndex = 1;

                // console.log(`Detalle pedido before:`)
                // console.log(this.detallepedido);
        this._pedidoService.postPedido(this.pedido).subscribe(
            data => {
                this.toastMe();
                this.tab1disabled = true
                this.tab2disabled = false;
                this.tab3disabled = true;
                this.selectedIndex = 1;
            },

            error =>  {
                console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
                 this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                  this.failpostPedido();
              }
            });
    }

    postServicio(){
      this.detallepedido.COSTO = this.items[this.detallepedido.IDSP - 1].SPCOSTO * this.detallepedido.CANTIDAD;
        this._pedidoService.postDetallePedido(this.detallepedido).subscribe(
            data => {
                this.tab1disabled = true;
                this.tab2disabled = false;
                this.tab3disabled = false;
                this.next = false;
                this.postServiciotoast();

            },

            error =>  {
                console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
                 this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                  this.failpostServicio();
              }
            });
    }

  nuevoclientes(dialog){
      this._router.navigate(['clientes']);
      // this.close(dialog);
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

  toastMe() {
      this.toast.toast(`Añade ahora los servicios para el pedido`);
    }

  failpostPedido() {
      this.toast.toast(`Ocurrió un problema al intentar crear un nuevo pedido. Recarga la página por favor`);
    }

  failpostServicio() {
      this.toast.toast(`Ocurrió un problemaal intentar añadir el servicio al pedido. Por favor ve a detalles del pedido`);
    }

  failgetLastPedido() {
      this.toast.toast(`Temporalmente no se puede continuar con el pedido.`);
    }

  postServiciotoast() {
      this.toast.toast(`Servicio añadido al pedido`);
    }

  changeSelectedTab(){
          this.selectedIndex = 2;
          console.log('al tab del mapa');
          if(this.selectedIndex != 2){
              this.selectedIndex = 2;
          }
  }
}
