// export class Empleados {
//   constructor(
//     public EEMAIL: string,
//     public EPASSWORD: string,
//     public EPRIVILEGIO: string,
//     public ENOMBRE: string,
//     public EAPELLIDOS: string,
//     public ETELEFONO: string,
//     public EREFERENCIA1: string,
//     public EREFERENCIA2: string,
//     public EFECHACONTRATO: string,
//     public EUBICACION: string,
//     public IDSUCURSAL: number
//   ){}
// }

export interface Empleados {
  IDEMPLEADO: number;
  EEMAIL: string;
  EPASSWORD: string;
  EPRIVILEGIO: string;
  ENOMBRE: string;
  EAPELLIDOS: string;
  ETELEFONO: string;
  EREFERENCIA1: string;
  EREFERENCIA2?: string;
  EFECHACONTRATO: string;
  EUBICACION?: string;
  IDSUCURSAL: number
}
