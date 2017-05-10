import { ClienteComponent } from './cliente/cliente.component';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Clientes } from './clientes';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'kp-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers:[ClientesService, ClienteComponent]
})
export class ClientesComponent implements OnInit {
    public loading: boolean;
    public errorMessage;
    public clientes: Clientes[];
    public clientesCard = true;
  constructor(private _clienteService: ClientesService, private _clienteComponent : ClienteComponent) {
      this.loading = true;

  }

  ngOnInit() {
    this.clienteEdit();

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
                alert(`Error al conseguir los clientes ${this.errorMessage}`);
            }
        }

      );
  }

  clienteEdit(){

  }

}