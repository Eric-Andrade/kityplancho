export interface Servicios {
  IDSP: number;
  IDPRENDAS: number;
  IDSERVICIO: number;
  SPCOSTO: number;
  SPDESCUENTO: number;
}

export interface IServicios {
  IDSERVICIO: number;
  SERVNOMBRE: string;
  SERVACTIVO: string;
  IDSUCURSAL: number;
}

export interface IPrendas{
  IDPRENDA: number;
  PNOMBREUNIDAD: string;
  PDESCRIPCION?: string;
}
