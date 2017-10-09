import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PedidoService } from "./pedido.service";
import { PedidosService } from "../pedidos/pedidos.service";
import { IPedido, IDetallePedidos, ISP } from "./pedido";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiciosService } from '../../../servicios/servicios.service';
import { Servicios } from '../../../servicios/servicios';
import { SucursalesService } from '../../../sucursales/sucursales.service';
import { Sucursales } from '../../../sucursales/sucursales';
import { ClientesService } from '../../../clientes/clientes.service';
import { Clientes } from '../../../clientes/clientes';
import { Md2Toast } from 'md2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'kp-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [ PedidoService, ServiciosService, SucursalesService, ClientesService, PedidosService]
})
export class PedidoComponent implements OnInit {
    public suma: number;
    /*Map*/
        public customStyle = [
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-30"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff004d"
                    },
                    {
                        "saturation": "73"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ];
        /*Start position */


    public opcionpedido: string;
    public isRequired: boolean;
    public isDisabled: boolean;
    public isDisabledMultiple: boolean;
    public itemMultiple: any;
    public currentServicios: string[];
    public items: Servicios; //pedientes de cambiar en sp del bussines
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
    public max = 50;
    public min = 1;
    public showTicks = true;
    public step = 1;
    public thumbLabel = true;
    public value = 0;
    public vertical = false;
    public latmap: number;
    public lngmap: number;
    public latmape: number;
    public lngmape: number;
    public zoom: number;
    public draggable:boolean = true;
    public kityplancho: string;
    public statusservicio: Array<any>;
    public inputdisabled: boolean;

    constructor(private _pedidoService: PedidoService,
                private _serviciosService: ServiciosService,
                private _sucursalesService: SucursalesService,
                private _clientesService: ClientesService,
                private toast: Md2Toast,
                private _route: ActivatedRoute,
                private _router: Router,
                private _pedidosService: PedidosService) {

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
                  this.latmap = 24.02780775285771;
                  this.lngmap = -104.65332895517349;
                  this.zoom = 13;
                  this.kityplancho = '/assets/map-markerEnCola.png';
                  this.latmape = 24.02720775285771;
                  this.lngmape = -104.63332895517349;
                  this.statusservicio = [
                        { status: 'en_cola', nombre: 'Pedido en espera'},
                        { status: 'en_camino', nombre: 'Pedido aprobado'},
                        { status: 'en_proceso', nombre: 'Procesando pedido'},
                        { status: 'para_entregar', nombre: 'Listo para entregar'},
                        { status: 'entregado', nombre: 'Pedido entregado'},
                        { status: 'no_atendido', nombre: 'Rechazar pedido'}
                    ];
              this.inputdisabled = false;


  }

  ngOnInit() {

  this.pedido = {
      ID:null,
      PPRECIOTOTAL:0,
      PSTATUS:'en_camino',
      PPAGADO:'contraentrega',
      PFORMA:'efectivo',
      PFECHA:'',
      PDIRECCION_R:'Direcion de un nuevo pedido de prueba',
      PCOORDENADAS_R:'24.02780775285771,-104.65332895517349',
      PDIRECCION_E:'Direcion de un nuevo pedido de prueba',
      PCOORDENADAS_E:'24.02780775285771,-104.65332895517349',
      IDCLIENTE:null,
  }

  this.detallepedido = {
      ID:null,
      DPCANTIDADPRENDAS:1,
      IDSP:null,
      DPIDPEDIDO:null,
      DPCOSTOPEDIDO:0,
  };

  this.sp ={
      ID:null,
      SPCOSTO:null,
      SPDESCUENTO:null,
  }
      this.getServicios();


  }

  getServicios(){
    this._serviciosService.getallsp().subscribe(
        result => {
            this.items = result;
            this.sp = {
              ID:this.items.ID,
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
       this._sucursalesService.getSucursalesActivos().subscribe(
          response => {
              console.log(response);
              this.sucursales = response;
              if (!this.sucursales) {
                  console.log('Error en el servidor...');
              }else{
                //   console.log('Sucursales cargadas correctamente');
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
      this._clientesService.getClientesActivos().subscribe(
            result =>{
                this.clientes = result;
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
              this.detallepedido = result.PEDIDO;
                this.detallepedido.DPIDPEDIDO = this.detallepedido[0].IDPEDIDO; // ? Ah?
                console.log('Último pedido');
              console.log(this.detallepedido.DPIDPEDIDO);
              if (!this.detallepedido.DPIDPEDIDO) {
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

    getpedido(idpedido){
      this.ingresacoords();
      setTimeout(()=>{this._router.navigate(['pedidos',idpedido]);},1000);
    }

    postPedido(){
                this.getlastpedido();
                // this.tab1disabled = true;
                // this.tab2disabled = false;
                // this.tab3disabled = true;
                // // formPedido.reset();
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
      this.detallepedido.DPCOSTOPEDIDO = this.items[this.detallepedido.IDSP - 1].SPCOSTO * this.detallepedido.DPCANTIDADPRENDAS;

        // this.tab1disabled = true;
        // this.tab2disabled = false;
        // this.tab3disabled = false;
        // this.next = false;
        // this.postServiciotoast();

        this._pedidoService.postDetallePedido(this.detallepedido).subscribe(
            data => {
                this.tab1disabled = true;
                this.tab2disabled = true;
                this.tab3disabled = true;
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
      this.toast.toast(`Temporalmente no se puede continuar con el pedido`);
    }

  ingresacoords() {
      this.toast.toast(`Ahora por favor actualiza las coordenadas a recoger y entrega del pedido`);
    }


  postServiciotoast() {
      this.toast.toast(`Servicio añadido al pedido`);
    }

  getSumaP(id){
    setTimeout(()=>{
    this._pedidoService.getSumaP(id).subscribe(
            data => {
              let CARRITOSUMA = data.CARRITOSUMA[0];
              this.suma = data.CARRITOSUMA[0].SUMA;
              console.log('CARRITOSUMA');
              console.log(this.suma);

            },

            error =>  {
                console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
                 this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                  this.failpostServicio();
              }
            });
            },1000);
  }

    public putPedido(formPedido, pedidodialog){
        if(!this.pedido) return;

       if(this.pedido.PPAGADO == 'por_adelantado'){
                let descuento = this.suma * 10 / 100;
                this.suma = this.suma - descuento;
                this.pedido.PPRECIOTOTAL = Math.round(this.suma);
        }else{
          this.suma = this.suma;
          this.pedido.PPRECIOTOTAL = parseInt(this.suma.toString());
        }
      this.pedido.ID = this.detallepedido.DPIDPEDIDO;
      console.log('PUT pedido');
        console.log(this.pedido);
              this._pedidosService.putPedido(this.pedido).subscribe(
              data => {
                setTimeout(()=>{
                this.close(pedidodialog);
                },1300)

                setTimeout(()=>{
                  this.selectedIndex = 0;
                  this.tab1disabled = false;
                  this.tab2disabled = true;
                  this.tab3disabled = true;
                  formPedido.reset();
                },1000)
                
                    //console.log(`El cliente ${this.cliente.IDCLIENTE} | ${this.cliente.CNOMBRE} fue actualizado exitosamente!`);

              }, error => {
                  console.warn(`WTF! The error is: ${JSON.stringify(error.json())}`);
                    this.errorMessage = <any>error;
                    if(this.errorMessage != null){
                    this.failinfoputPedido();
                }
              })
  }

    changeSelectedTab(){
            this.tab1disabled = true;
            this.tab2disabled = true;
            this.tab3disabled = false;
            this.selectedIndex = 2;
            if(this.selectedIndex != 2){
                this.selectedIndex = 2;
            }
  }

  failinfoputPedido(){
      this.toast.toast(`Ocurrió un error al intentar actualizar los datos del pedido ${this.pedido.ID}`);
    }
}
