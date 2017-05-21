import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Clientes } from './clientes';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers:[ClientesService]
})
export class ClientesComponent implements OnInit {
    public loading: boolean;
    public errorMessage;
    public message: boolean;
    public clientes: Clientes[];
    public clientesCard = true;
  constructor(private _clienteService: ClientesService,
              private _route: ActivatedRoute,
              private _router: Router,
              private toast: Md2Toast
              ) {
      this.loading = true;
      this.message = false;
  }

  ngOnInit() {
    this.getclientes();
  }

  getclientes(){
    this._clienteService.getClientes().subscribe(
          result =>{
              console.log(result);
              this.clientes = result.CLIENTES;
              if(!this.clientes){
                  console.log('Error en el servidor...');
              }else{
                  this.loading = false;
              }
          },
          error =>{
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  this.message = true;
                  this.toastMe();
              }
          }

        );
  }

  getcliente(idcliente){
      this._router.navigate(['clientes',idcliente]);
  }

  // editcliente(dialog: any){
  //     this._clienteComponent.open(dialog);
  // }

  toastMe() {
      this.toast.toast(`Algo falló al tratar de obtener la lista de clientes, intenta nuevamente por favor`);
    }
}
