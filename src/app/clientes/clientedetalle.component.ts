// import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Clientes, MisPedidos  } from './clientes';
import { ClientesService } from './clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

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
  public pedidos: MisPedidos;
  public loading: boolean;
  public color = 'accent';
  public checked;
  constructor(private _clientesService: ClientesService,
            private _route: ActivatedRoute,
            private _router: Router,
            private toast: Md2Toast) {
              this.loading = true;
  }

  ngOnInit() {
    // this.checked = this.cliente[0].ACTIVO;
    this.getCliente();
     this.getMisPedidos();
  }

  getCliente() {
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._clientesService.getCliente(id).subscribe(
          response => {
            this.cliente = response;
            this.loading = false;
            this.cliente = {    ID:this.cliente[0].ID,
                                CEMAIL:`${this.cliente[0].CEMAIL}`,
                                CPASSWORD:`${this.cliente[0].CPASSWORD}`,
                                CNOMBRE:`${this.cliente[0].CNOMBRE}`,
                                CAPELLIDOS:`${this.cliente[0].CAPELLIDOS}`,
                                CTELEFONO:`${this.cliente[0].CTELEFONO}`,
                                ACTIVO: this.cliente[0].ACTIVO
                              };

              // if(this.cliente.ACTIVO === 1){
              //   this.checked = true;
              // } else if (this.cliente.ACTIVO === 0){
              //   this.checked = false;
              // }

              // this.getMisPedidos();
                //console.log('Interfaz de cliente llenada...');
                //console.log(this.cliente);
                if(!this.cliente){
                    this._router.navigate(['/clientes']);
                }
          },
          error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    this.message = true;
                    this.failinfogetCliente();
                }
          }
        );
      });
    }

    putCliente(){
        if(!this.cliente) return;

          this._clientesService.putCliente(this.cliente).subscribe(
          data => {
               this.toastMe();
               //console.log(`El cliente ${this.cliente.ID} | ${this.cliente.CNOMBRE} fue actualizado exitosamente!`);
               this._router.navigate(['/clientes', this.cliente.ID]);

          }, error => {
              console.warn(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                this.failinfoputCliente();
            }
          });

        console.log('putcliente');
        console.log(this.cliente);
    }

    getMisPedidos() {
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._clientesService.getMisPedidos(id).subscribe(
          response => {
            this.pedidos = response.MISPEDIDOS;
            this.loading = false;
          console.log(this.pedidos);
          },
          error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    this.message = true;
                    this.failinfogetCliente();
                }
          }
        );
      });
    }

    toastMe() {
      this.toast.toast(`Datos de
      ${this.cliente.CNOMBRE}
      ${this.cliente.CAPELLIDOS} actualizados exitosamente`);
    }

    failinfogetCliente() {
      this.toast.toast(`Error al encontrar la información de este cliente, intenta nuevamente por favor`);
    }

    failinfoputCliente() {
      this.toast.toast(`Error al actualizar la información de ${this.cliente.CNOMBRE}
      ${this.cliente.CAPELLIDOS}, intenta nuevamente por favor`);
    }
    regresar(){
      this._router.navigate(['clientes']);
    }

   getpedido(idpedido){
      this._router.navigate(['pedidos',idpedido]);
    }

}
