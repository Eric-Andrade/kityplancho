import { Component, OnInit } from '@angular/core';
import { Empleados } from '../../../empleados/empleados';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public empleado: Empleados;
  public errorMessage;
  public message: boolean;
  constructor(private _loginService: LoginService,
              private _route: ActivatedRoute,
              private _router: Router,
              private toast: Md2Toast) { }

  ngOnInit() {
    this.empleado = {
        IDEMPLEADO: null,
        EEMAIL:'',
        EPASSWORD:'',
        EPRIVILEGIO:'administrador',
        ENOMBRE:'',
        EAPELLIDOS:'',
        ETELEFONO:'',
        EREFERENCIA1:'',
        EREFERENCIA2:'',
        EFECHACONTRATO:'',
        EUBICACION:'',
        IDSUCURSAL: null,
    }
  }
  //pendiente login
  public login(){
    this._loginService.login(this.empleado).subscribe(
          result =>{
              console.log(result);
              let identity = result.LOGINADMIN;
              if(!this.empleado){
                  console.log('Error en el servidor...');
              }else{
                  this.toastMe();
              }
          },
          error =>{
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  this.message = true;

              }
          }

        );

  }

  toastMe() {
      this.toast.toast(`Bienvenido de nuevo ${this.empleado.ENOMBRE}`);
    }
}
