import { readFile, writeFile } from "fs/promises";
import { Producto } from "../models/Producto/Productos";


export class ProductoRepository {
    private ruta = "./productos.json";

    async obtenerProductos(): Promise<Producto[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.log("Error al obtener productos:", error);
            return [];
        }
    }

    async guardarProductos(productos: Producto[]): Promise<void> {
        try {
            await writeFile(this.ruta, JSON.stringify(productos, null, 4));
        } catch (error) {
            console.log("Error al guardar productos:", error);
        }
    }
}
