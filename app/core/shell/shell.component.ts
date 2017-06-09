import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kp-shell',
  template:`
  <kp-index></kp-index>
  <router-outlet></router-outlet> `,
  styles:[]
})
export class ShellComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
