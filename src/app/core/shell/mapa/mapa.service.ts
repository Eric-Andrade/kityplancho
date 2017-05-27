import { Injectable } from '@angular/core';
import { global } from '../../../global';
@Injectable()
export class MapaService {
   public local: string;
   public url: string;

  constructor() {
        this.local = global.local;
        this.url = global.url;
   }

}
