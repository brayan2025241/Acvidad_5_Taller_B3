import { IncomingMessage, ServerResponse } from "http";
import { ProductoService } from "../services/ProductoService";
import { Producto } from "../models/Producto/Productos";

const service = new ProductoService();

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

export async function routesProducto(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    // GET | LISTAR PRODUCTOS
    try {
        if (metodo === "GET" && url === "/productos") {
            const productos = await service.listarProductos();
            res.writeHead(200);
            res.end(JSON.stringify({ productos }));
        }
    } catch (error) {
        res.writeHead(500);
        res.end(
            JSON.stringify({
                mensaje: (error as Error).message,
            }),
        );
    }

    // POST | AGREGAR PRODUCTO
    try {
        if (metodo === "POST" && url === "/productos/agregar") {
            const nuevoProducto = await obtenerBody<Producto>(req);
            await service.agregarProducto(nuevoProducto);
            res.writeHead(201);
            return res.end(
                JSON.stringify({
                    mensaje: "Producto agregado correctamente",
                    producto: nuevoProducto,
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

    // PUT | ACTUALIZAR PRODUCTO
    if (metodo === "PUT" && url.startsWith("/productos/actualizar/")) {
        const id = Number(url.split("/")[3]);

        if (isNaN(id)) {
            res.writeHead(400);
            return res.end(JSON.stringify({ mensaje: "ID no válido" }));
        }

        const body = await obtenerBody<any>(req);
        const productoActualizado: Producto = {
            ...body,
            idProducto: id,
        };
        if (!productoActualizado.nombreProducto) {
            res.writeHead(400);
            return res.end(
                JSON.stringify({
                    mensaje: "Es obligatorio incluir la propiedad 'nombre' en el body",
                }),
            );
        }

        await service.actualizarProducto(productoActualizado);

        res.writeHead(200);
        return res.end(
            JSON.stringify({
                mensaje: "Producto actualizado correctamente",
                producto: productoActualizado,
            }),
        );
    }

    // DELETE | ELIMINAR PRODUCTO
    try {
        if (metodo === "DELETE" && url.startsWith("/productos/eliminar/")) {
            const id = Number(url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                return res.end(JSON.stringify({ mensaje: "ID no válido" }));
            }

            await service.eliminarProducto(id);

            res.writeHead(200);
            return res.end(
                JSON.stringify({ mensaje: "Producto eliminado correctamente" }),
            );
        }
    } catch (error) {
        res.writeHead(400);
        return res.end(JSON.stringify({ mensaje: (error as Error).message }));
    }

    // GET | BUSCAR PRODUCTO POR ID
    try {
        if (metodo === "GET" && url.startsWith("/productos/buscar/")) {
            const id = Number(url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                return res.end(JSON.stringify({ mensaje: "ID no válido" }));
            }

            const producto = await service.buscarPorId(id);

            res.writeHead(200);
            return res.end(JSON.stringify({ producto }));
        }
    } catch (error) {
        res.writeHead(400);
        return res.end(JSON.stringify({ mensaje: (error as Error).message }));
    }
}