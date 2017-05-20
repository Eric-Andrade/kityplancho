export interface Sucursales {
  IDSUCURSAL: string;
  SNOMBRE: string;
   SDIRECCION: string;
  SEMAIL: string;
  STELEFONO: string;
  SESTADO: string;
  SMUNICIPIO: string;
  SLOCALIDAD: string;
  SHORARIO: string;
  ACTIVO: string;
}

export interface IPedidos {
  IDPEDIDO: number,
  CNOMBRE: string,
  CAPELLIDOS: string,
  PPRECIOTAL: number,
  PFECHA: string,
  PPAGADO: string,
  PSTATUS: string
}
