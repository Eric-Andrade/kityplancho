import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Clientes } from '../clientes';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'kp-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers:[ClientesService]
})
export class ClienteComponent implements OnInit {
    public opcioncliente: string;
    public isRequired: boolean;
    public isDisabled: boolean;
    public isDisabledMultiple: boolean;
    public itemMultiple: any;
    public Client: string;
    public cliente: Clientes;
    public errorMessage;

  constructor(private _clientesService:ClientesService,
              private _route:ActivatedRoute,
              private _router:Router) {
        this.opcioncliente = 'nuevo cliente';
        this.isRequired = true;
        this.isDisabled = false;
        this.isDisabledMultiple = false;
        this.itemMultiple = null;
  }

ngOnInit( ) {
    // this.cliente = new Clientes("","","","","");
    this.cliente = {IDCLIENTE: 0, CCORREO:'eric@hotmail.com',CCONTRASENA:'12345',CNOMBRE:'Eric',CAPELLIDOS:'Torres',CTELEFONO:'1234567890'};
    console.log(this.cliente);
  }

launchDialog(dialog: any) {
    dialog.open();
  }

  open(dialog: any) {
    dialog.open();
  }

  close(dialog: any) {
    dialog.close();
  }

  openAlert(event: Event) { }

  openConfirm(event: Event) { }

  openPrompt(event: Event) { }

  openAdvanced(event: Event) { }

  openTabDialog(event: Event) { }

  public postCliente(model:Clientes){
    console.log(model);
    this._clientesService.postCliente(this.cliente).subscribe(
      response=> {
            if(!response.cliente){
                alert(`Error al guardar nuevo cliente `)
            }else{
                this.cliente = response.cliente;
            }
      },
       error => {
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
                console.log(`Error al guardar nuevo cliente: ${this.errorMessage}`);
                alert(`Error al guardar nuevo cliente: ${this.errorMessage}`);
            }
        }

    )
  }

}
