import { Component, OnInit } from '@angular/core';
import { MapaService } from './mapa.service';
import { Mapa } from "app/core/shell/mapa/mapa";
import { IPedidos } from '../pedidos/pedidos';
import { PedidosService } from '../pedidos/pedidos.service';

@Component({
  selector: 'kp-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
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
    public imageEC: string;
    public imageECola: string;
    public kityplancho: string;
    public opcionpedido:string = 'Registrar nuevo pedido';
/*Markers*/
    markers: Mapa[];
    constructor() {
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
    }

  ngOnInit() {
  }

  postPedido(){

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



    markerClicked(marker: Mapa, index: number) {
        console.log(`Marcador clickeado ${marker.name} en index ${index}`);
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
}
