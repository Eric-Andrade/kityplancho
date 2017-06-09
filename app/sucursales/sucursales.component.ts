import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sucursales } from './sucursales';
import { SucursalesService } from './sucursales.service';

@Component({
  selector: 'kp-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
    public loading: boolean;
    public message: boolean;
    public errorMessage;
    public sucursales: Sucursales[];
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
    // public pedidos: IPedidos[];
  constructor(private _sucursalesService: SucursalesService,
              private _route: ActivatedRoute,
              private _router: Router,) {

                this.loading = true;
                this.message = false;
                this.lat = 24.02780775285771;
                this.lng = -104.65332895517349;
                this.zoom = 13;
                this.imageECola = '/assets/map-markerEnCola.png';
                this.imageEC = '/assets/map-markerEncamino.png';
                this.kityplancho = '/assets/kityplancho-marker.png';
               }

  ngOnInit() {

    this._sucursalesService.getSucursales().subscribe(
        response => {
            console.log(response);
            this.sucursales = response.SUCURSALES;
            if (!this.sucursales) {
                console.log('Error en el servidor...');
            }else{
                this.loading = false;
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

  getSucursal(idsucursal){
      this._router.navigate(['sucursales',idsucursal]);
  }

}
