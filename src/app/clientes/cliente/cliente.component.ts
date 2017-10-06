import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Clientes } from '../clientes';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { Md2Toast } from 'md2';
import { ClientesComponent } from '../clientes.component';

@Component({
  selector: 'kp-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers:[ClientesService, ClientesComponent]
})
export class ClienteComponent implements OnInit {
  diag: any;
  public opcioncliente: string;
    public isRequired: boolean;
    public isDisabled: boolean;
    public isDisabledMultiple: boolean;
    public itemMultiple: any;
    public Client: string;
    public cliente: Clientes;
    public errorMessage;
    public lastcliente: number;
    public loading: boolean;
    public message: boolean;

  constructor(private _clientesService: ClientesService,
              private _route: ActivatedRoute,
              private _router: Router,
              private toast: Md2Toast,
              public _clientesComponent: ClientesComponent) {
        this.opcioncliente = 'nuevo cliente';
        this.isRequired = true;
        this.isDisabled = false;
        this.isDisabledMultiple = false;
        this.itemMultiple = null;
          this.loading = true;
          this.message = false;
  }

ngOnInit( ) {
    // this.cliente = new Clientes("","","","","");
    this.cliente = { 
      ID:null, 
      CEMAIL:'',
      CPASSWORD:'',
      CNOMBRE:'',
      CAPELLIDOS:'',
      CTELEFONO:''
      };
  }

   getlastcliente(){
   setTimeout(()=>{
      this._clientesService.getLastCliente().subscribe(
        result =>{
              this.lastcliente = result.ID;
              console.log('último cliente');
              console.log(this.lastcliente);
              if(!this.lastcliente){
                  console.log('Error en el servidor...');
              }else{

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
   }, 800 );
  }

  public postCliente(clientedialog) {

    this._clientesService.postCliente(this.cliente).subscribe(
          data => {
            this.getlastcliente();
            this.toastMe();
            setTimeout(() => {
                 let idcliente = this.lastcliente;
                     this._router.navigate(['clientes',idcliente]);
                     console.log('enviar al cliente desde el post');
                     this.close(clientedialog);
               },2000);

          }, error => {
              console.warn(`WTF! The error is: ${JSON.stringify(error.json())}`);
               this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                this.failpostCliente();
            }
          });
  }


  open(dialog: any) {
    dialog.open();
  }

  close(dialog: any) {
    dialog.close();
  }


  toastMe() {
      this.toast.toast(`El cliente
      ${this.cliente.CNOMBRE}
      ${this.cliente.CAPELLIDOS} fue guardado exitosamente`);
    }

  failpostCliente() {
      this.toast.toast(`Algo falló al intentar guardar al cliente
      ${this.cliente.CNOMBRE}
      ${this.cliente.CAPELLIDOS}, intenta de nuevo por favor`);
    }

}
