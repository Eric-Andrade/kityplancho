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

export interface IDetallePedido{
  IDDP:number;
  CANTIDAD:number;
  IDSP:number;
  IDPEDIDO:number;
  COSTO?:number;
}

export interface ISP {
  IDSP: number;
  SPCOSTO: number;
  SPDESCUENTO: number;
}
