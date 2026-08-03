import { readFile, writeFile } from "fs/promises";
import { Pedido } from "../models/Pedido/Pedidos";


export class PedidoRepository {
    private ruta = "./pedidos.json";

    async obtenerPedidos(): Promise<Pedido[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.log("Error al obtener pedidos:", error);
            return [];
        }
    }

    async guardarPedidos(pedidos: Pedido[]): Promise<void> {
        try {
            await writeFile(this.ruta, JSON.stringify(pedidos, null, 4));
        } catch (error) {
            console.log("Error al guardar pedidos:", error);
        }
    }
}
