export interface Pedidos {
  IDPEDIDO: number,
  CNOMBRE: string,
  CAPELLIDOS: string,
  PPRECIOTAL: number,
  PFECHA: string,
  PPAGADO: string,
  PSTATUS: string
}

export interface IPedidos{
  IDPEDIDO: number;
  PPRECIOTOTAL: number;
  PSTATUS: string;
  PFECHA: string;
  PPAGADO: string;
  PDIRECCION_R: string;
  PDIRECCION_E: string;
  COORDENADAS_R: string;
  LAT?: string;
  LNG?: string;
  COORDENADAS_E: string;
  IDCLIENTE: number;
}
