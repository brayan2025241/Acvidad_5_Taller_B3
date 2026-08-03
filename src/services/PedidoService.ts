import { PedidoRepository } from "../repository/PedidoRepository";
import { Pedido } from "../models/Pedido/Pedidos";


export class PedidoService {
    private repository = new PedidoRepository();

    async listarPedidos(): Promise<Pedido[]> {
        return await this.repository.obtenerPedidos();
    }

    async buscarPorId(id: number): Promise<Pedido> {
        const pedidos = await this.repository.obtenerPedidos();
        const pedidoExistente = pedidos.find((p) => Number(p.idPedido) === Number(id));

        if (!pedidoExistente) {
            throw new Error(`El pedido con ID ${id} no existe.`);
        }
        console.log("Pedido encontrado:", pedidoExistente);
        return pedidoExistente;
    }

    async agregarPedido(pedido: Pedido): Promise<void> {
        const pedidos = await this.repository.obtenerPedidos();

        if (!pedido.idPedido || isNaN(Number(pedido.idPedido))) {
            const maxId = pedidos.reduce(
                (max, p) => (Number(p.idPedido) > max ? Number(p.idPedido) : max),
                0
            );
            pedido.idPedido = maxId + 1;
        } else {
            const existe = pedidos.some(
                (p) => Number(p.idPedido) === Number(pedido.idPedido)
            );
            if (existe) {
                throw new Error(`El pedido con ID ${pedido.idPedido} ya existe.`);
            }
        }

        pedidos.push(pedido);
        await this.repository.guardarPedidos(pedidos);
    }

    async actualizarPedido(pedido: Pedido): Promise<void> {
        const pedidos = await this.repository.obtenerPedidos();
        const indice = pedidos.findIndex(
            (p) => Number(p.idPedido) === Number(pedido.idPedido),
        );

        if (indice === -1) {
            throw new Error(`El pedido con ID ${pedido.idPedido} no existe.`);
        }

        pedidos[indice] = pedido;
        await this.repository.guardarPedidos(pedidos);
    }

    async eliminarPedido(id: number): Promise<void> {
        const pedidos = await this.repository.obtenerPedidos();
        const existe = pedidos.some((p) => Number(p.idPedido) === Number(id));

        if (!existe) {
            throw new Error(`El pedido con ID ${id} no existe.`);
        }

        const pedidosFiltrados = pedidos.filter(
            (p) => Number(p.idPedido) !== Number(id),
        );
        await this.repository.guardarPedidos(pedidosFiltrados);
    }
}
