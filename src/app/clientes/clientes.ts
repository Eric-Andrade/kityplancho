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
    IDCLIENTE: number;
    CEMAIL: string;
    CPASSWORD: string;
    CNOMBRE: string;
    CAPELLIDOS: string;
    CTELEFONO: string;
    ACTIVO?: number;
}
