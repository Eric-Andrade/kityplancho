export interface Pedido {
  PSTATUS: string;
  PDIRECCION_R?: string;
  PPRECIOTOTAL: number;
  PDIRECCION_E: string;
  PPAGADO: string;

  DP_CANTIDADPRENDAS:number;
  IDSP:number;
  IDRUTA:number;
  IDPEDIDO:number;
  DP_COSTOPEDIDO:number;
}
