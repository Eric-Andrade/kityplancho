// import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Clientes  } from './clientes';
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
    this.getCliente();
  }

  getCliente() {
    this._route.params.forEach((params: Params) => {
        const id = params['id'];
        this._clientesService.getCliente(id).subscribe(
          response => {
            this.cliente = response.CLIENTE;
              this.loading = false;
                this.cliente = { IDCLIENTE:this.cliente[0].IDCLIENTE,
                                CEMAIL:`${this.cliente[0].CEMAIL}`,
                                CPASSWORD:`${this.cliente[0].CPASSWORD}`,
                                CNOMBRE:`${this.cliente[0].CNOMBRE}`,
                                CAPELLIDOS:`${this.cliente[0].CAPELLIDOS}`,
                                CTELEFONO:`${this.cliente[0].CTELEFONO}`,
                                ACTIVO: this.cliente[0].ACTIVO
                              };

              if(this.cliente.ACTIVO === 1){
                this.checked = false;
              } else if (this.cliente.ACTIVO === 0){
                this.checked = true;
              }

                console.log('Interfaz de cliente llenada...');
                console.log(this.cliente);
                if(!this.cliente){
                    this._router.navigate(['/clientes']);
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

    putCliente(){
        if(!this.cliente) return;
          this._clientesService.putCliente(this.cliente).subscribe(
          data => {
               console.log(`El cliente ${this.cliente.IDCLIENTE} | ${this.cliente.CNOMBRE} fue actualizado exitosamente!`);
               this._router.navigate(['/clientes', this.cliente.IDCLIENTE]);
          }, error => {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                console.log(`Error al actualizar empleado: ${this.errorMessage}`);
                alert(`Error al guardar nuevo empleado: ${this.errorMessage}`);
            }
          })
    }

  toastMe() {
    this.toast.toast(`Datos de ${this.cliente.CNOMBRE} actualizados exitosamente`);
  }

}
