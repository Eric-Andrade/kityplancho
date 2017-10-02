import { ServiciosService } from '../../../servicios/servicios.service';
import { Servicios } from '../../../servicios/servicios';
import { IDetallePedidos, IDetallePedido, IPedido, ISP, DP } from '../pedido/pedido';
import { Component, OnInit } from '@angular/core';
import { PedidosService } from './pedidos.service';
import { PedidoService } from '../pedido/pedido.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';
import { ClientesService } from '../../../clientes/clientes.service';
import { Clientes } from '../../../clientes/clientes';

@Component({
  selector: 'kp-pedidodetalle',
  templateUrl: './pedidodetalle.component.html',
  styleUrls: ['./pedidodetalle.component.css'],
  providers:[ PedidosService, ClientesService, ServiciosService, PedidoService ]
})
export class PedidodetalleComponent implements OnInit {
  suma: any;
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

  public pedido:IPedido;
  public detallepedidos:IDetallePedidos[];
  public detallepedido:IDetallePedido;
  public dp: DP;
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
  public max = 50;
  public min = 1;
  public showTicks = true;
  public step = 1;
  public thumbLabel = true;
  public value = 0;
  public vertical = false;
  public sp: ISP;
  public lat: number;
  public lng: number;
  public zoom: number = 14;
  public kityplancho:string;
  public draggable: boolean = true;
  public coord: Array<any>;
  public coords: Array<any>;
  public plat: any;
  public plng: any;
  public coorde: Array<any>;
  public coordse: Array<any>;
  public plate: any;
  public plnge: any;
  public statusservicio: Array<any>;
  public inputdisabled: boolean;
  public opacityr:number = 1;
  public opacitye:number = 1;
  public pedidocoord: string;
  public pedidocoorde: string;
  public direccion: string;

  constructor(private _pedidosService: PedidosService,
              private _serviciosService: ServiciosService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _clientesService: ClientesService,
              private toast: Md2Toast,
              private _pedidoService: PedidoService) {

              this.loading = true;
              this.isRequired = true;
              this.isDisabled = false;
              this.kityplancho = '/assets/map-marker.png';
              // this.lat = 24.02780775285771;
              // this.lng = -104.65332895517349;
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

    this.getPedido();
    this.getDetallePedido();
    this.getClientes();
    this.getServicios();
  this.dp = {
DPIDDP:0,
    DPCANTIDAD:1,
    DPIDSP:0,
    DPIDPEDIDO:0,
    DPCOSTO:0,
  }
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
                  PFORMA:`${this.pedido[0].PFORMA}`,
                  PFECHA:`${this.pedido[0].PFECHA}`,
                  PDIRECCIONR:`${this.pedido[0].PDIRECCION_R}`,
                  COORDENADASR: this.pedido[0].COORDENADAS_R,
                  PDIRECCIONE:`${this.pedido[0].PDIRECCION_E}`,
                  COORDENADASE: this.pedido[0].COORDENADAS_E,
                  IDCLIENTE: this.pedido[0].IDCLIENTE,
                      };

              this.coord = this.pedido.COORDENADASR.split(',',2);
              this.plat = parseFloat(this.coord[0]);
              this.plng = parseFloat(this.coord[1]);
              this.coords = [this.plat, this.plng]
              this.pedido.LAT = this.plat;
              this.pedido.LNG = this.plng;
              console.log('IDPEDIDO: ' + this.pedido.IDPEDIDO + ' '+ this.coords  + ' '+ this.pedido.PSTATUS)
              this.coorde = this.pedido.COORDENADASE.split(',',2);
              this.plate = parseFloat(this.coorde[0]);
              this.plnge = parseFloat(this.coorde[1]);
              this.coordse = [this.plate, this.plnge]
              this.pedido.LATE = this.plate;
              this.pedido.LNGE = this.plnge;

   this.getSumaP(this.pedido.IDPEDIDO);
    this.suma = this.pedido.PPRECIOTOTAL;
    console.log('ngOInit suma');
    console.log(this.suma);
            // if(this.pedido.PSTATUS == 'entregado' || this.pedido.PSTATUS == 'no_atendido'){
            //   this.inputdisabled = true;
            //   this.draggable = false;
            // }
            if(this.pedido.COORDENADASR == this.pedido.COORDENADASE){
                this.direccion = 'Dirección de recolección y entrega';
            }else{
              this.direccion = 'Dirección a recoger pedido';
            }

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
              DPCANTIDADPRENDAS:this.detallepedido[0].DP_CANTIDADPRENDAS,
              IDSP:this.detallepedido[0].IDSP,
              IDPEDIDO:this.detallepedido[0].IDPEDIDO,
              DPCOSTOPEDIDO:this.detallepedido[0].DP_COSTOPEDIDO,
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

  public clickMarcador(marcador:IPedido, i:number){
    console.log('clickMarcador');
    console.log(marcador, i);
    this.opacityr = 1;
  }

  public dragEndMarcador(marcador:IPedido, evento){
    marcador.LAT = evento.coords.lat;
    marcador.LNG = evento.coords.lng;
    this.pedidocoord = `${marcador.LAT},${marcador.LNG}`;
    console.log('dragEndMarcador');
    console.log(this.pedidocoord, evento);
    this.pedido.COORDENADASR = this.pedidocoord;

    if(this.pedido.COORDENADASR === this.pedido.COORDENADASE){
          this.pedidocoorde = `${marcador.LAT},${marcador.LNG}`;
          console.log('dragEndMarcadorE');
          console.log(this.pedidocoorde, evento);
          this.pedido.COORDENADASE = this.pedidocoorde;
    }
    else{
     console.log('son diferentes')
    }
      }

  public dragEndMarcadore(marcador:IPedido, evento){

    if(this.pedido.COORDENADASR == this.pedido.COORDENADASE){
      this.pedidocoorde = `${marcador.LAT},${marcador.LNG}`;
      console.log('dragEndMarcadorE');
      console.log(this.pedidocoorde, evento);
      this.pedido.COORDENADASE = this.pedidocoorde;
    }else{
      marcador.LATE = evento.coords.lat;
      marcador.LNGE = evento.coords.lng;
      this.pedidocoorde = `${marcador.LATE},${marcador.LNGE}`;
      console.log('dragEndMarcadore');
      console.log(this.pedidocoorde, evento);
      this.pedido.COORDENADASE = this.pedidocoorde;
    }
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
                },500);
      }

  public putPedido(){
    setTimeout(()=>{

        if(!this.pedido) return;
           if(this.pedido.PPAGADO == 'por_adelantado' ){
               if(this.suma != null){
                   let descuento = this.suma * 10 / 100;
                this.suma = this.suma - descuento;
                this.pedido.PPRECIOTOTAL = Math.round(this.suma);
               }else{
                   this.pedido.PPRECIOTOTAL = 0;
               }
                
        }else{
          
          if(this.suma != null){
                this.suma = this.suma;
                this.pedido.PPRECIOTOTAL = this.suma;
            }else{
                this.pedido.PPRECIOTOTAL = 0;
            }
        }
      this.getDetallePedido();
       // if(this.pedido.COORDENADASR == "null" && this.pedido.COORDENADASE == "null"){
        //     this.pedido.COORDENADASR = `${this.pedido[0].LAT},${this.pedido[0].LNG}`;
        //     this.pedido.COORDENADASE = `${this.pedido[0].LATE},${this.pedido[0].LNGE}`;
        // }else{
        //   this.pedido.COORDENADASR = this.pedidocoord;
        //   this.pedido.COORDENADASE = this.pedidocoorde;
        // }
      console.log('PUT pedido');
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
    },1500)
  }


  public putServicio(){

        if(!this.detallepedido) return;
        this.detallepedido.DPCOSTOPEDIDO = this.items[this.detallepedido.IDSP - 1].SPCOSTO * this.detallepedido.DPCANTIDADPRENDAS;
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

  public deletecarrito(id){
  this._pedidosService.deletecarrito(id).subscribe(
          data => {
            this.getDetallePedido();
            this.getSumaP(this.pedido.IDPEDIDO);
            this.suma = this.suma;
                this.postdeletedetalle();
          },

          error =>  {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                this.faildeletedetalle();
            }
          });
  }

  postServicio(){
        this.dp.DPCOSTO = this.items[this.dp.DPIDSP - 1].SPCOSTO * this.dp.DPCANTIDAD;
        this.dp.DPIDPEDIDO = this.pedido.IDPEDIDO;
        console.log('Post servicio');
        console.log(this.dp);
        this._pedidoService.postDP(this.dp).subscribe(
            data => {
           this.getDetallePedido();
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

    refreshpdp(id){
        this.getSumaP(id);
        let gs = this.getSumaP(id);
        console.log('Suma post servicicio añadido')
        console.log(gs)
        this.putPedido();
        setTimeout(()=>{
            this.getPedido();
        },1000)
    }


    failpostServicio() {
          this.toast.toast(`Ocurrió un problemaal intentar añadir el servicio al pedido. Por favor ve a detalles del pedido`);
        }

    postServiciotoast() {
          this.toast.toast(`Servicio añadido al pedido`);
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

    faildeletedetalle(){
      this.toast.toast(`Ocurrió un error al intentar eliminar los servicios del pedido ${this.pedido.IDPEDIDO}`);
    }

    postdeletedetalle(){
      this.toast.toast(`Servicio del pedido ${this.pedido.IDPEDIDO} eliminado exitosamente`);
    }
}
