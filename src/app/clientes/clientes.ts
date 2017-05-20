// export class Clientes {
//   constructor(
// public CCORREO: string,
// public CCONTRASENA: string,
// public CNOMBRE: string,
// public CAPELLIDOS: string,
// public CTELEFONO: string
//   ){
//   }
// }


export interface Clientes {
    IDCLIENTE: string;
    CEMAIL: string;
    CPASSWORD: string;
    CNOMBRE: string;
    CAPELLIDOS: string;
    CTELEFONO: string;
    ACTIVO?: number;
}


export interface MisPedidos {
    IDPEDIDO:number;
    PRECIO:number;
    FECHA:string;
    PAGADO:string;
    STATUS:string;
}
