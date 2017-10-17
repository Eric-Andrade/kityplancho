import { Component, OnInit } from '@angular/core';
import { Empleados } from '../../../empleados/empleados';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';
import { username, password } from './authguard.guard';

@Component({
  selector: 'kp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  identity: any;
  token: any;
  public username;
  public password;
  public empleado: Empleados;
  public errorMessage;
  public message: boolean;
  constructor(private _loginService: LoginService,
              private _route: ActivatedRoute,
              private _router: Router,
              private toast: Md2Toast) {
                    this.empleado = {
                      ID: null,
                      EEMAIL: '',
                      EPASSWORD: '',
                      EPRIVILEGIO: '',
                      ENOMBRE: '',
                      EAPELLIDOS: '',
                      ETELEFONO: '',
                      EDIRECCION: '',
                      EREFERENCIAFAM1: '',
                      EREFERENCIAFAM2: '',
                      EREFERENCIA1: '',
                      EREFERENCIA2: '',
                      EFECHACONTRATO: '',
                      EUBICACION: '',
                      ESUELDO: '',
                      ERFC: '',
                      EIMSS: '',
                      ETIPOCONTRATO: '',
                      IDSUCURSAL:1,
                  };
                   this.username = username;
                   this.password = password;
               }

  ngOnInit() {
  }
  // component login
  public login(logindialog) {
    // e.preventDefault();
    //   	console.log(e);
    //   	var username = e.target.elements[0].value;
    //   	var password = e.target.elements[1].value;

    //   	if(username == 'erictor@gmail.com' && password == '123456') {
    //       this._loginService.setUserLoggedIn();
    //   		this._router.navigate(['acerca']);
    // }

    this._loginService.login(this.empleado).subscribe(
          response => {
              this.empleado = response;
              console.log(this.empleado);
              if (response == null) {
                this.faillogin();

              }else {
                  this.close(logindialog);
                  let username = this.empleado.EEMAIL;
                  let password = this.empleado.EPASSWORD;
                     this._loginService.storedUserData(username, password);
                     this._loginService.setUserLoggedIn();
                     this._router.navigate(['pedidos']);
                     setTimeout(() => {
                      location.reload();
                     }, 1000 );
                    //  this._router.navigate(['pedidos']);

                  }
          },
          error => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null){
                  console.log('Error al loggerse: '+ this.errorMessage);
                  this.message = true;
              }
          });
  }

  close(dialog: any) {
    dialog.close();
  }

  toastMe() {
      this.toast.toast(`Bienvenido de nuevo ${this.empleado.ENOMBRE}`);
    }

  faillogin() {
      this.toast.toast(`Algo ha salido mal al intentar ingresar, intenta de nuevo`);
    }
  failtoken(){
    this.toast.toast('No se ha generado el token correctamente');
  }
}
