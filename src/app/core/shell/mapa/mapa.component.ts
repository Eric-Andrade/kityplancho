import { Component, OnInit } from '@angular/core';
import { MapaService } from './mapa.service';
import { Mapa } from "./mapa";
import { IPedidos } from '../pedidos/pedidos';
import { PedidosService } from '../pedidos/pedidos.service';
import { Md2Toast } from 'md2';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'kp-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  providers:[ PedidosService ]
})
export class MapaComponent implements OnInit {
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
    public lat: number;
    public lng: number;
    public zoom: number;
    public draggable:boolean = false;
    public imageEC: string;
    public imageECola: string;
    public kityplancho: string;
    public opcionpedido:string = 'Registrar nuevo pedido';
    public pedidos: IPedidos[];
    public errorMessage;
    public loading: boolean;
    public message: boolean;
    public coord: Array<any>;
    public coords: Array<any>;
    public plat:any;
    public plng:any;
    public pIcon: string;
/*Markers*/
    markers: Mapa[];
    constructor(private _pedidosService: PedidosService,
                private toast: Md2Toast,
                private _route: ActivatedRoute,
              private _router: Router) {
      /* navigator.geolocation.watchPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
       });*/
        this.lat = 24.02780775285771;
        this.lng = -104.65332895517349;
        this.zoom = 13;
        this.imageECola = '/assets/map-markerEnCola.png';
        this.imageEC = '/assets/map-markerEncamino.png';
        this.kityplancho = '/assets/kityplancho-marker.png';
        this.markers = [
                        { name: 'Pedido 1', lat: 24.0248976, lng: -104.6649055, draggable: true },
                        { name: 'Pedido 2', lat: 24.0094675, lng: -104.6594958, draggable: true },
                        { name: 'Pedido 3', lat: 24.0207523, lng: -104.6194784, draggable: true }
                    ];
        this.loading = true;
        this.message = false;
    }

  ngOnInit() {

    this.getpedidos();
  }

  postPedido(){

  }
  //pendiente poner array de punteros
  getpedidos(){
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
                // if(this.pedidos[i].PSTATUS == 'en_cola'){
                  //     this.pIcon = '/assets/map-markerEnCola.png';
                  //       if(this.pedidos[i].PSTATUS == 'en_camino'){
                  //         this.pIcon = '/assets/map-markerEncamino.png';
                  //       }
                  //         if(this.pedidos[i].PSTATUS == 'en_proceso'){
                  //           this.pIcon = '/assets/map-markerProcess.png';
                  //         }
                  //           if(this.pedidos[i].PSTATUS == 'para_entregar'){
                  //             this.pIcon = '/assets/map-markerDeliver.png';
                  //           }
                  // }

                switch(this.pedidos[i].PSTATUS) {
                   case "en_cola": {
                      this.pIcon = '/assets/map-markerEnCola.png';
                      break;
                   }
                   case "en_camino": {
                      this.pIcon = '/assets/map-markerEncamino.png';
                      break;
                   }
                   case "en_proceso": {
                      this.pIcon = '/assets/map-markerProcess.png';
                      break;
                   }
                   case "para_entregar": {
                      this.pIcon = '/assets/map-markerDeliver.png';
                      break;
                   }
                  case "entregado": {
                      this.pIcon = '/assets/map-markerComplete.png';
                      break;
                   }
                   case "no_atendido": {
                      this.pIcon = '/assets/map-markerDenenged.png';
                      break;
                   }
                   default: {
                      console.log('Status invalido');
                      break;
                   }
              }
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
/*Marcadores*/
    mapClicked($event: any) {
        const newMarker = {
            name: '¡Hola humano, soy un nuevo pedido! Confirmame, por favor',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: false
      };

        this.markers.push(newMarker);
    }

    markerClicked(pedido: IPedidos, index: number) {
        console.log(`Marcador clickeado ${pedido.IDPEDIDO} en index ${index}`);
    }

    markerDragEnd(marker: any, $event: any) {
        console.log(`Marcador movido`, marker, $event);

        const merkerupdated = {
            name: marker.name,
            lat: parseFloat(marker.lat),
            lng: parseFloat(marker.lng),
            draggable: false,
        };

        const newLat = $event.coords.lat;
        const newLng = $event.coords.lng;
    }

    saveMarkers(marker: Mapa) {
        this.markers.push(marker);
        this.markersLocalStorage();
    }

    markersLocalStorage() {
        localStorage.setItem('markers', JSON.stringify(this.markers));
    }

    getMarkersLocalStorage() {
        if (localStorage.getItem('markers')) {
            this.markers = JSON.parse(localStorage.getItem('markers'));
        }else {
            this.markers = [];
        }
    }

    getpedido(idpedido){
      this._router.navigate(['pedidos',idpedido]);
    }

    failgetPedidos() {
      this.toast.toast(`Algo falló al intentar obtener la lista de pedidos, intenta de nuevo por favor`);
    }
}
