import { Categoria } from "../models/Producto/Categoria";
import { ProductoService } from "../services/ProductoService";
import { rl } from "../utils/Readline";

const service = new ProductoService();

export async function MenuProductos() {
    let opcion = 0;

    while (true) {
        console.log("                  ");
        console.log("     PRODUCTOS    ");
        console.log("                  ");
        console.log("\n1. Agregar producto");
        console.log("2. Listar productos");
        console.log("3. Actualizar producto");
        console.log("4. Eliminar producto");
        console.log("5. Buscar por id");
        console.log("6. Salir al menú principal");

        opcion = Number(await rl.question("-OPCION: "));

        switch (opcion) {
            case 1:
                const idPrd = Number(await rl.question("Id: "));
                const nombrePrd = await rl.question("Nombre del Producto: ");
                const precioPrd = Number(await rl.question("Precio del producto: "));
                const stock = Number(await rl.question("Cantidad de stock: "));
                const categoria = await rl.question("Categoria del producto: ");

                await service.agregarProducto({
                    idProducto: idPrd,
                    nombreProducto: nombrePrd,
                    precio: precioPrd,
                    stock,
                    categoria: categoria.toUpperCase() as Categoria
                });

                console.log("Producto agregado correctamente.");
                break;

            case 2:
                console.table(await service.listarProductos());
                break;

            case 3:
                const idActualizar = Number(await rl.question("Id del producto a actualizar: "));
                const nombreAct = await rl.question("Nombre del Producto: ");
                const precioAct = Number(await rl.question("Precio del producto: "));
                const stockAct = Number(await rl.question("Cantidad de stock: "));
                const categoriaAct = await rl.question("Categoria del producto: ");

                await service.actualizarProducto({
                    idProducto: idActualizar,
                    nombreProducto: nombreAct,
                    precio: precioAct,
                    stock: stockAct,
                    categoria: categoriaAct.toUpperCase() as Categoria
                });

                console.log("Producto actualizado correctamente.");
                break;

            case 4:
                const idEliminar = Number(await rl.question("Id del producto a eliminar: "));
                await service.eliminarProducto(idEliminar);
                console.log("Producto eliminado correctamente.");
                break;

            case 5:
                const idBuscar = Number(await rl.question("Id del producto: "));
                await service.buscarPorId(idBuscar);
                break;

            case 6:
                console.log("Saliendo al menú principal...");
                return;
        }
    }
}
