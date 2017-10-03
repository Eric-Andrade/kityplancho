export interface IPedido {
    IDPEDIDO: number;
    PPRECIOTOTAL: number;
    PSTATUS: string;
    PPAGADO: string;
    PFORMA: string;
    PFECHA?: string;
    PDIRECCIONR: string;
    COORDENADASR?: string;
    PDIRECCIONE?: string;
    LAT?: string;
    LNG?: string;
    LATE?: string;
    LNGE?: string;
    COORDENADASE?: string;
    IDCLIENTE: number;
}

export interface IDetallePedidos {
  IDDP: number;
  CANTIDAD: number;
  IDSP: number;
  IDPEDIDO: number;
  COSTO?: number;
}

export interface IDetallePedido {
  IDDP: number;
  DPCANTIDADPRENDAS: number;
  IDSP: number;
  IDPEDIDO: number;
  DPCOSTOPEDIDO?: number;
}

export interface DP {
  DPIDDP: number;
  DPCANTIDAD: number;
  DPIDSP: number;
  DPIDPEDIDO: number;
  DPCOSTO?: number;
}

export interface ISP {
  IDSP: number;
  SPCOSTO: number;
  SPDESCUENTO: number;
}
