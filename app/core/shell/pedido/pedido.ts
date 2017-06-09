export interface IPedido{
  IDPEDIDO: number;
  PSTATUS: string;
  PDIRECCIONR: string;
  PDIRECCIONE?: string;
  PPRECIOTOTAL?: number;
  PPAGADO: string;
  COORDENADASR?: string;
  COORDENADASE?:string;
  IDCLIENTE: number
}

export interface IDetallePedidos{
  IDDP:number;
  CANTIDAD:number;
  IDSP:number;
  IDPEDIDO:number;
  COSTO?:number;
}

export interface IDetallePedido{
  IDDP:number;
  DP_CANTIDADPRENDAS:number;
  IDSP:number;
  IDPEDIDO:number;
  DP_COSTOPEDIDO?:number;
}

export interface ISP {
  IDSP: number;
  SPCOSTO: number;
  SPDESCUENTO: number;
}
