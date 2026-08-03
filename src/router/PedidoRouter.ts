import { IncomingMessage, ServerResponse } from "http";
import { PedidoService } from "../services/PedidoService";
import { Pedido } from "../models/Pedido/Pedidos";

const service = new PedidoService();

function obtenerBody<T>(req: IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
        let cuerpo = "";

        req.on("data", (chunk: { toString: () => string }) => {
            cuerpo += chunk.toString();
        });

        req.on("end", () => {
            try {
                resolve(cuerpo ? JSON.parse(cuerpo) : {});
            } catch (error) {
                reject(new Error("JSON inválido en el cuerpo de la petición"));
            }
        });

        req.on("error", (err: any) => reject(err));
    });
}

export async function routesPedido(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    // GET | LISTAR PEDIDOS
    try {
        if (metodo === "GET" && url === "/pedidos") {
            const pedidos = await service.listarPedidos();
            res.writeHead(200);
            return res.end(JSON.stringify({ pedidos }));
        }
    } catch (error) {
        res.writeHead(500);
        return res.end(
            JSON.stringify({
                mensaje: (error as Error).message,
            }),
        );
    }

    // POST | AGREGAR PEDIDO
    try {
        if (metodo === "POST" && url === "/pedidos/agregar") {
            const nuevoPedido = await obtenerBody<Pedido>(req);

            await service.agregarPedido(nuevoPedido);

            res.writeHead(201);
            return res.end(
                JSON.stringify({
                    mensaje: "Pedido agregado correctamente",
                    pedido: nuevoPedido,
                }),
            );
        }
    } catch (error) {
        res.writeHead(400);
        return res.end(
            JSON.stringify({
                mensaje: (error as Error).message,
            }),
        );
    }

    // PUT | ACTUALIZAR PEDIDO
    if (metodo === "PUT" && url.startsWith("/pedidos/actualizar/")) {
        const id = Number(url.split("/")[3]);

        if (isNaN(id)) {
            res.writeHead(400);
            return res.end(JSON.stringify({ mensaje: "ID no válido" }));
        }

        try {
            const body = await obtenerBody<any>(req);
            const pedidoActualizado: Pedido = {
                ...body,
                idPedido: id,
            };

            await service.actualizarPedido(pedidoActualizado);

            res.writeHead(200);
            return res.end(
                JSON.stringify({
                    mensaje: "Pedido actualizado correctamente",
                    pedido: pedidoActualizado,
                }),
            );
        } catch (error) {
            res.writeHead(400);
            return res.end(
                JSON.stringify({
                    mensaje: (error as Error).message,
                }),
            );
        }
    }

    // DELETE | ELIMINAR PEDIDO
    try {
        if (metodo === "DELETE" && url.startsWith("/pedidos/eliminar/")) {
            const id = Number(url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                return res.end(JSON.stringify({ mensaje: "ID no válido" }));
            }

            await service.eliminarPedido(id);

            res.writeHead(200);
            return res.end(
                JSON.stringify({ mensaje: "Pedido eliminado correctamente" }),
            );
        }
    } catch (error) {
        res.writeHead(400);
        return res.end(JSON.stringify({ mensaje: (error as Error).message }));
    }

    // GET | BUSCAR PEDIDO POR ID
    try {
        if (metodo === "GET" && url.startsWith("/pedidos/buscar/")) {
            const id = Number(url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                return res.end(JSON.stringify({ mensaje: "ID no válido" }));
            }

            const pedido = await service.buscarPorId(id);

            res.writeHead(200);
            return res.end(JSON.stringify({ pedido }));
        }
    } catch (error) {
        res.writeHead(400);
        return res.end(JSON.stringify({ mensaje: (error as Error).message }));
    }
}