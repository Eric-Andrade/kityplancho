import { Component, OnInit } from '@angular/core';
import { Empleados } from '../empleados/empleados';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'kp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public empleado: Empleados;
  constructor() { }

  ngOnInit() {
    this.empleado = {
        IDEMPLEADO: null,
        EEMAIL:'',
        EPASSWORD:'',
        EPRIVILEGIO:'',
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

  login(){

  }

}
