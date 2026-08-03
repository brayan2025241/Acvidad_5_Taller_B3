import { EstadoPedido } from "../../enums/EstadoPedido";

export interface Pedido {
    idPedido: number;
    cliente: string;
    producto: string;
    cantidad: number;
    precioTotal: number;
    estadoPedido: EstadoPedido;
}
