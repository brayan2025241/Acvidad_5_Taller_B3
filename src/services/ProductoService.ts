import { ProductoRepository } from "../repository/ProductoRepository";
import { Producto } from "../models/Producto/Productos";


export class ProductoService {
    private repository = new ProductoRepository();

    async listarProductos(): Promise<Producto[]> {
        return await this.repository.obtenerProductos();
    }

    async buscarPorId(id: number): Promise<Producto> {
        const productos = await this.repository.obtenerProductos();
        const productoExistente = productos.find((p) => Number(p.idProducto) === Number(id));

        if (!productoExistente) {
            throw new Error(`El producto con ID ${id} no existe.`);
        }
        console.log("Producto encontrado:", productoExistente);
        return productoExistente;
    }

    async agregarProducto(producto: Producto): Promise<void> {
        const productos = await this.repository.obtenerProductos();
        const existe = productos.some((p) => Number(p.idProducto) === Number(producto.idProducto));

        if (existe) {
            throw new Error(`El producto con ID ${producto.idProducto} ya existe.`);
        }

        productos.push(producto);
        await this.repository.guardarProductos(productos);
    }

    async actualizarProducto(producto: Producto): Promise<void> {
        const productos = await this.repository.obtenerProductos();
        const indice = productos.findIndex(
            (p) => Number(p.idProducto) === Number(producto.idProducto),
        );

        if (indice === -1) {
            throw new Error(`El producto con ID ${producto.idProducto} no existe.`);
        }

        productos[indice] = producto;
        await this.repository.guardarProductos(productos);
    }

    async eliminarProducto(id: number): Promise<void> {
        const productos = await this.repository.obtenerProductos();
        const existe = productos.some((p) => Number(p.idProducto) === Number(id));

        if (!existe) {
            throw new Error(`El producto con ID ${id} no existe.`);
        }

        const productosFiltrados = productos.filter(
            (p) => Number(p.idProducto) !== Number(id),
        );
        await this.repository.guardarProductos(productosFiltrados);
    }
}
