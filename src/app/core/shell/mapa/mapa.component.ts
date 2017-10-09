import { Component, OnInit } from '@angular/core';
import { MapaService } from './mapa.service';
import { Mapa } from "./mapa";
import { IPedidos, CR, CE } from '../pedidos/pedidos';
import { PedidosService } from '../pedidos/pedidos.service';
import { Md2Toast } from 'md2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empleados } from '../../../empleados/empleados'
@Component({
  selector: 'kp-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  providers:[ PedidosService, MapaService ]
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
    public draggable: boolean = false;
    public imageEC: string;
    public imageECola: string;
    public imageD: string;
    public kityplancho: string;
    public opcionpedido: string = 'Registrar nuevo pedido';
    public pedidos: IPedidos[];
    public cr: CR[];
    public ce: CE[];
    public rutero: Empleados[];
    public errorMessage;
    public loading: boolean;
    public message: boolean;
    public coord: Array<any>;
    public coords: Array<any>;
    public plat:any;
    public plng:any;
    public pIcon: string = '/assets/map-marker.png';
    public coordr: Array<any>;
    public coordsr: Array<any>;
    public platr:any;
    public plngr:any;
    public pIconr: string = '/assets/map-marker.png';
    public ruteroIco: string;

/*Markers*/
    markers: Mapa[];
    constructor(private _pedidosService: PedidosService,
               private _mapaService: MapaService,
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
        this.imageD = '/assets/map-markerDeliver.png';
        this.kityplancho = '/assets/kityplancho-marker.png';
        this.ruteroIco = '/assets/rutero.png';
        this.markers = [
                        { name: 'Pedido 1', lat: 24.0248976, lng: -104.6649055, draggable: true },
                        { name: 'Pedido 2', lat: 24.0094675, lng: -104.6594958, draggable: true },
                        { name: 'Pedido 3', lat: 24.0207523, lng: -104.6194784, draggable: true }
                    ];
        this.loading = true;
        this.message = false;
    }

  ngOnInit() {
    this.getcoordenasr();
    this.getcoordenase();
    this.getubicacionrutero();

    setInterval(()=>{
    this.getcoordenasr();
    this.getcoordenase();
    // console.log('reejecutado coords de pedidos con exito');
    },60000)

    setInterval(()=>{
    this.getubicacionrutero();
    // console.log('reejecutado  coords de rutero con exito');
    },20000)
  }
  getcoordenasr(){

     this._mapaService.getcoordenasr().subscribe(
        result => {
            this.cr = result;
            let cont = 0;
            for(let entry of this.cr){
              let i = cont++;
              if (this.cr[i].PCOORDENADAS_R != null){
                this.coord = this.cr[i].PCOORDENADAS_R.split(',', 2);

              // console.log(' IDPEDIDO: ' + this.pedidos[i].IDPEDIDO + ' latitud: ' + this.coord[0] + ' longitud: ' + this.coord[1]);
              this.plat = parseFloat(this.coord[0]);
              this.plng = parseFloat(this.coord[1]);
              this.coords = [this.plat, this.plng];
              this.cr[i].LAT = this.plat;
              this.cr[i].LNG = this.plng;
            }
              // console.log('IDPEDIDO: ' + this.pedidos[i].IDPEDIDO + ' plat: ' + this.plat + ' plng: ' + this.plng );
              // console.log('IDPEDIDO: ' + this.cr[i].IDPEDIDO + ' '+ this.coords  + ' '+ this.cr[i].STATUS)
            }

            if (!this.cr ) {
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

getcoordenase() {
      this._mapaService.getcoordenase().subscribe(
        result => {
            this.ce = result;
            var cont = 0;
            for (let entry of this.ce){
              var i = cont++;
              if (this.ce[i].PCOORDENADAS_E != null) {
                this.coord = this.ce[i].PCOORDENADAS_E.split(',', 2);

             // console.log(' latitudE: ' + this.coord[0] + ' longitudE: ' + this.coord[1]);
              this.plat = parseFloat(this.coord[0]);
              this.plng = parseFloat(this.coord[1]);
              this.coords = [this.plat, this.plng];
              this.ce[i].LATE = this.plat;
              this.ce[i].LNGE = this.plng;
            }
              // console.log('IDPEDIDO: ' + this.pedidos[i].IDPEDIDO + ' plat: ' + this.plat + ' plng: ' + this.plng );
             // console.log('IDPEDIDO: ' + this.ce[i].IDPEDIDO + ' '+ this.coords  + ' '+ this.ce[i].STATUS)
            }

            if (!this.ce ) {
                console.warn('Error en el servidor this.ce...');
            }else {
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


getubicacionrutero() {
      this._mapaService.getubicacionrutero().subscribe(
        result => {
            this.rutero = result;
            var cont = 0;
            for(let entry of this.rutero){
              var i = cont++;
              if(this.rutero[i].EUBICACION != null) {
                this.coordr = this.rutero[i].EUBICACION.split(',', 2);

              // console.log(' IDPEDIDO: ' + this.pedidos[i].IDPEDIDO + ' latitud: ' + this.coord[0] + ' longitud: ' + this.coord[1]);
              this.platr = parseFloat(this.coordr[0]);
              this.plngr = parseFloat(this.coordr[1]);
              this.coordsr = [this.platr, this.plngr];
              this.rutero[i].LATR = this.platr;
              this.rutero[i].LNGR = this.plngr;
            }
              // console.log('IDPEDIDO: ' + this.pedidos[i].IDPEDIDO + ' plat: ' + this.plat + ' plng: ' + this.plng );
             // console.log('Rutero: ' + this.rutero[i].IDEMPLEADO + ' '+ this.coords  + ' '+ this.rutero[i].EPRIVILEGIO)
            }

            if (!this.rutero ) {
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
                this.failgetRutero();
            }
        }

      )
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

    getempleado(idempleado){
      this._router.navigate(['empleados',idempleado]);
    }


    failgetRutero() {
      this.toast.toast(`Algo falló al intentar obtener la ubicación de los ruteros en el mapa, intenta de nuevo por favor`);
    }

    failgetPedidos() {
      this.toast.toast(`Algo falló al intentar obtener la ubicación de los pedidos en el mapa, intenta de nuevo por favor`);
    }
}
