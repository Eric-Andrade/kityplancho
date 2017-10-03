import { Component, OnInit } from '@angular/core';
import { Empleados } from '../empleados/empleados';

@Component({
  selector: 'kp-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public perfil: Empleados;
  public loading: boolean;
  constructor() { }

  ngOnInit() {

     this.perfil = {  ID:0,
                      EEMAIL:'vero@hotmail.com',
                      EPASSWORD:'123213',
                      EPRIVILEGIO:'rutero',
                      ENOMBRE:'vero',
                      EAPELLIDOS:'nicads',
                      ETELEFONO:'1234567890',
                      EDIRECCION:'Itecorrrrr',
                      EREFERENCIAFAM1:'',
                      EREFERENCIAFAM2:'',
                      EREFERENCIA1:'ref1dasdsadasdsadsadsad',
                      EREFERENCIA2:'ref2sadasdasdsadsadsaddsa',
                      EFECHACONTRATO:'2017-04-13',
                      EUBICACION:'Dgo',
                      ESUELDO:'',
                      ERFC:'',
                      EIMSS:'',
                      ETIPOCONTRATO:'',
                      IDSUCURSAL:1,
                      };

  }

  public putPerfil(){

  }

}
