// import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Clientes  } from './clientes';
import { ClientesService } from './clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'kp-clientedetalle',
  templateUrl: 'clientedetalle.component.html',
  styleUrls: ['clientedetalle.component.css'],
  providers: [ ClientesService ]
})

export class ClienteDetalleComponent implements OnInit {
  public errorMessage;
  public message: boolean;
  public cliente: Clientes;
  public loading: boolean;

  constructor(private _clientesService: ClientesService,
            private _route: ActivatedRoute,
            private _router: Router) {
              this.loading = true;
  }

  ngOnInit() {
       this.getCliente();
  }

    getCliente() {
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._clientesService.getCliente(id).subscribe(
          response => {
                if (!response) {
                    this._router.navigate(['/clientes']);
                }else {
                    this.cliente = response.CLIENTE;
                    this.loading = false;
                    console.log(this.cliente);
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
}
