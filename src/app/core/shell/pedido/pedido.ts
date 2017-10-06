export interface IPedido {
    ID: number;
    PPRECIOTOTAL: number;
    PSTATUS: string;
    PPAGADO: string;
    PFORMA: string;
    PFECHA?: string;
    PDIRECCION_R: string;
    PCOORDENADAS_R?: string;
    PDIRECCION_E?: string;
    LAT?: string;
    LNG?: string;
    LATE?: string;
    LNGE?: string;
    PCOORDENADAS_E?: string;
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
  ID: number;
  SPCOSTO: number;
  SPDESCUENTO: number;
}
