export interface Clientes {
    IDCLIENTE: string;
    CEMAIL: string;
    CPASSWORD: string;
    CNOMBRE: string;
    CAPELLIDOS: string;
    CTELEFONO: string;
    ACTIVO?: number;
}


export interface MisPedidos {
    IDPEDIDO:number;
    PRECIO:number;
    FECHA:string;
    PAGADO:string;
    STATUS:string;
}
