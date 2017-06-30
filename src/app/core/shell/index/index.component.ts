import { LoginService } from '../login/login.service';
import { Component, OnInit } from '@angular/core';
import { PedidoComponent } from '../pedido/pedido.component';
import { IPedidos, Notify } from '../pedidos/pedidos';
import { PedidosService } from '../pedidos/pedidos.service';
import { Md2Toast } from 'md2';
import { username, password } from '../login/authguard.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'kp-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers:[ PedidosService, LoginService ]
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


  constructor(private _pedidosService: PedidosService,
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
  console.log('username:');
  console.log(this.username);
  console.log('password:');
  console.log(this.password);

  this.sumaencola();
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

  sumaencola(){
    setInterval(() =>
    this._pedidosService.sumaencola().subscribe(
      result=>{

        if(!result.COUNT[0]){
          this.suma = 0;
        }else{
          this.suma = result.COUNT[0].COUNT;

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
    ,3000);

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
