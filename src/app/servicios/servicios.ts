export interface Servicios {
  IDSP: number;
  IDPRENDAS: number;
  IDSERVICIO: number;
  SERVNOMBRE: string;
  PNOMBREUNIDAD: string;
  SPCOSTO: number;
  SPDESCUENTO: number;
}

export interface IServicios {
  IDSERVICIO: number;
  SERVNOMBRE: string;
  SERVACTIVO: string;
  IDSUCURSAL: number;
}

export interface IPrenda{
  IDPRENDA: number;
  PNOMBREUNIDAD: string;
  PDESCRIPCION?: string;
}

export interface IPrendas{
  IDPRENDAS: number;
  PNOMBREUNIDAD: string;
  PDESCRIPCION?: string;
}

export interface SP {
    IDPRENDAS:number;
    IDSERVICIO:number;
    PNOMBREUNIDAD:string;
    IDSP:number;
    SPCOSTO:number;
    SPDESCUENTO:number;
}

export interface SPone {
    IDPRENDAS: number;
    IDSERVICIO: number;
    IDSP: number;
    SPCOSTO:  number;
    SPDESCUENTO: number;
}
