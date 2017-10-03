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
  ID: number;
  EEMAIL: string;
  EPASSWORD: string;
  EPRIVILEGIO: string;
  ENOMBRE: string;
  EAPELLIDOS: string;
  ETELEFONO: string;
  EDIRECCION: string;
  EREFERENCIAFAM1: string;
  EREFERENCIAFAM2: string;
  EREFERENCIA1: string;
  EREFERENCIA2?: string;
  EFECHACONTRATO?: string;
  EUBICACION?: string;
  LATR?: string;
  LNGR?: string;
  ESUELDO: string;
  ERFC: string;
  EIMSS: string;
  ETIPOCONTRATO: string;
  IDSUCURSAL: number;
}


export interface EmpleadoAdjuntos {
  IDEA: number;
  EAINE: string;
  EACURP: string;
  EAACTANACIMIENTO: string;
  EACOMPROBANTEDOM: string;
  IDEMPLEADO:number;
}
