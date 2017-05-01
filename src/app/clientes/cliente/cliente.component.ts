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
    this.cliente = { IDCLIENTE:0, CCORREO:'',CCONTRASENA:'',CNOMBRE:'',CAPELLIDOS:'',CTELEFONO:''};
    console.log(this.cliente);
  }

  public postCliente(){
    this._clientesService.postCliente(this.cliente).subscribe(
          data => {
               console.log(`El cliente ${this.cliente.IDCLIENTE} | ${this.cliente.CNOMBRE} fue creado exitosamente!`);
               this._router.navigate(['clientes']);
          }, error => {
              console.log(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if(this.errorMessage != null){
                console.log(`Error al guardar nuevo empleado: ${this.errorMessage}`);
                alert(`Error al guardar nuevo empleado: ${this.errorMessage}`);
            }
          });
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


}
