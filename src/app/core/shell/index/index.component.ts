import { LoginService } from '../login/login.service';
import { Component, OnInit } from '@angular/core';
import { PedidoComponent } from '../pedido/pedido.component';
import { IPedidos, Notify } from '../pedidos/pedidos';
import { PedidosService } from '../pedidos/pedidos.service';
import { Md2Toast } from 'md2';
import { username, password } from '../login/authguard.guard';
import { Router } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { MapaService } from '../mapa/mapa.service';

@Component({
  selector: 'kp-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers:[ LoginService, MapaComponent, PedidosService, MapaService ]
})
export class IndexComponent implements OnInit {

  public message: boolean;
  public errorMessage: any;
  public loading: boolean;
  public coord: Array<any>;
  public coords: Array<any>;
  public plat:any;
  public plng:any;
  public pIcon: string;
  public title: string;
  public secciones: Array<string>;
  public pedidos: IPedidos[];
  public notify: Notify[];
  public isUserLoggedIn: boolean;
  public username;
  public password;
  public suma:any;


  constructor(private _mapaComponent: MapaComponent,
  private _mapaService:MapaService,
  private _pedidosService: PedidosService,
     private toast: Md2Toast,
              private _loginService: LoginService,
              private _router: Router) {
      this.title = 'KityPlancho';
      this.secciones = ['pedidos', 'clientes', 'empleados', 'servicios', 'ayuda'];
      this.loading = true;
      this.message = false;
      this.username = username;
      this.password = password;
      // this.suma = 0;
  }

  ngOnInit() {
  //  this.isUserLoggedIn = this._loginService.getUserLoggedIn();
  this.sumaencola();

  }

  clicksatellite(){
this._mapaComponent.getcoordenasr();
this._mapaComponent.getcoordenase();
this._mapaComponent.getubicacionrutero();
  }

  sumaencola(){
    setInterval(() =>
    this._pedidosService.sumaencola().subscribe(
      result => {

        if (!result) {
          this.suma = 0;
        }else {
          this.suma = result;

        }
        console.log('Suma en cola');
        console.log(this.suma);
      },
      error =>{
            this.errorMessage = <any>error;
            if (this.errorMessage != null ) {
                console.log(`This is the error: ${this.errorMessage}`);
                this.message = true;
                this.failgetPedidos();
            }
      })
    ,5123);

  }

  getpedidossec(){
    this._pedidosService.getpedidossec().subscribe(
      result=>{
        this.notify = result.GETPDPENCOLA;
        console.log('Pedidos en cola');
        console.log(this.notify);
      },
      error =>{
            this.errorMessage = <any>error;
            if (this.errorMessage != null ) {
                console.log(`This is the error: ${this.errorMessage}`);
                this.message = true;
                this.failgetPedidos();
            }
      })
  }

  getpedido(idpedido){
      this._router.navigate(['pedidos',idpedido]);
  }

  failgetPedidos() {
    this.toast.toast(`Algo fallo al intentar obtener la lista de pedidos, intenta de nuevo por favor`);
  }

  closesession(){
    this._loginService.logout();
    location.reload();
  }

  pedidosencola() {
    this.toast.toast(`Hay ${this.suma} pedidos que necesitan aprobación`);
  }
}
