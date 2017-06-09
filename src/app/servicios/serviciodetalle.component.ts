import { Component, OnInit } from '@angular/core';
import { IServicios } from './servicios'
import { ServiciosService } from './servicios.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Md2Toast } from 'md2';

@Component({
  selector: 'kp-serviciodetalle',
  templateUrl: './serviciodetalle.component.html',
  styleUrls: ['./serviciodetalle.component.css'],
  providers: [ServiciosService]
})
export class ServiciodetalleComponent implements OnInit {

ngOnInit() {}
}
