import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kp-acerca',
  template:`
      <div class="container-fluid">
            <p class="kp-text">©KityPlancho web y ©KityPlancho app son servicios de software desarrollados por ©Itecor Durango</p>

            <a href="http://itecordurango.com/itecordurango/WebPages/WelcomeItecor-es.aspx" target="_blank">
              <img src="assets/itecor1.png" class="img-responsive imgsticky" alt="©Itecor Durango" border="0">
            </a>
            <br>
            <span>10 Jun 2017</span>
            <p><span class="bold">Contáctanos.</span><br>
              Dirección: Zaragoza #109 int #7, Zona Centro 34000 Durango / México<br>
              Correo Electrónico: contacto@itecordurango.com<br>
              Teléfono: +52 618 8 25 12 31</p>
      </div>
  `,
  styles:[`
.bold{
    font-weight: 600;
    font-size: 15px;
  }
img {
  margin: 0 auto;
}
div {
    text-align: center;
    position: relative;
    top: 100%;
    -ms-transform: translateY(-50%);
    -webkit-transform: translateY(50%);
    transform: translateY(75%);
}

.imgsticky{
      position: sticky;
}`]
})
export class AcercaComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
