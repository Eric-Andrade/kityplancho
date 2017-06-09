import { Component, OnInit } from '@angular/core';
import { PedidoComponent } from '../pedido/pedido.component';
import { IPedidos } from '../pedidos/pedidos';
import { PedidosService } from '../pedidos/pedidos.service';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers:[ PedidosService ]
})
export class IndexComponent implements OnInit {
  message: boolean;
  public errorMessage: any;
  public loading: boolean;
  public coord: Array<any>;
  public coords: Array<any>;
  public plat:any;
  public plng:any;
  public pIcon: string;
  title: string;
  secciones: Array<string>;
  public pedidos: IPedidos[];

  constructor(private _pedidosService: PedidosService,
              private toast: Md2Toast) {
      this.title = 'KityPlancho';
      this.secciones = ['pedidos', 'clientes', 'empleados', 'servicios', 'ayuda'];
      this.loading = true;
      this.message = false;
  }

  ngOnInit() {
  }

  getpedidosmap(){
    console.log('cargados desde el slide');
     this._pedidosService.getPedidos().subscribe(
        result => {
            this.pedidos = result.PEDIDOS;
            var cont = 0;
            for(let entry of this.pedidos){
              var i = cont++;
              this.coord = this.pedidos[i].COORDENADAS_R.split(',',2);
              // console.log(' IDPEDIDO: ' + this.pedidos[i].IDPEDIDO + ' latitud: ' + this.coord[0] + ' longitud: ' + this.coord[1]);
              this.plat = parseFloat(this.coord[0]);
              this.plng = parseFloat(this.coord[1]);
              this.coords = [this.plat, this.plng]
              this.pedidos[i].LAT = this.plat;
              this.pedidos[i].LNG = this.plng;
              // console.log('IDPEDIDO: ' + this.pedidos[i].IDPEDIDO + ' plat: ' + this.plat + ' plng: ' + this.plng );
              console.log('IDPEDIDO: ' + this.pedidos[i].IDPEDIDO + ' '+ this.coords  + ' '+ this.pedidos[i].PSTATUS)
              if(this.pedidos[i].PSTATUS == 'en_cola'){
                  this.pIcon = '/assets/map-markerEnCola.png';
                    if(this.pedidos[i].PSTATUS == 'en_camino'){
                      this.pIcon = '/assets/map-markerEncamino.png';
                    }
                      if(this.pedidos[i].PSTATUS == 'en_proceso'){
                        this.pIcon = '/assets/map-markerProcess.png';
                      }
                        if(this.pedidos[i].PSTATUS == 'para_entregar'){
                          this.pIcon = '/assets/map-markerDeliver.png';
                        }
              }

                //   switch(this.pedidos[i].PSTATUS) {
                //    case "en_cola": {
                //       this.pIcon = '/assets/map-markerEnCola.png';
                //       break;
                //    }
                //    case "en_camino": {
                //       this.pIcon = '/assets/map-markerEncamino.png';
                //       break;
                //    }
                //    case "en_proceso": {
                //       this.pIcon = '/assets/map-markerProcess.png';
                //       break;
                //    }
                //    case "para_entregar": {
                //       this.pIcon = '/assets/map-markerDeliver.png';
                //       break;
                //    }
                //   case "entregado": {
                //       this.pIcon = '/assets/map-markerComplete.png';
                //       break;
                //    }
                //    case "no_atendido": {
                //       this.pIcon = '/assets/map-markerDenenged.png';
                //       break;
                //    }
                //    default: {
                //       console.log('Status invalido');
                //       break;
                //    }
                // }
            }

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
