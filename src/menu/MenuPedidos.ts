import { EstadoPedido } from "../enums/EstadoPedido";
import { PedidoService } from "../services/PedidoService";
import { rl } from "../utils/Readline";

const service = new PedidoService();

export async function MenuPedidos() {
    let opcion = 0;

    while (true) {
        console.log("                  ");
        console.log("     PEDIDOS      ");
        console.log("                  ");
        console.log("\n1. Agregar pedido");
        console.log("2. Listar pedidos");
        console.log("3. Actualizar pedido");
        console.log("4. Eliminar pedido");
        console.log("5. Buscar por id");
        console.log("6. Salir al menú principal");

        opcion = Number(await rl.question("-OPCION: "));

        switch (opcion) {
            case 1:
                const idPdd = Number(await rl.question("Id: "));
                const cliente = await rl.question("Cliente: ");
                const producto = await rl.question("Producto: ");
                const cantidad = Number(await rl.question("Cantidad: "));
                const precioTotal = Number(await rl.question("Precio total: "));
                const estadoPedido = await rl.question("Estado del pedido: ");

                await service.agregarPedido({
                    idPedido: idPdd,
                    cliente,
                    producto,
                    cantidad,
                    precioTotal,
                    estadoPedido: estadoPedido.toUpperCase() as EstadoPedido
                });

                console.log("Pedido agregado correctamente.");
                break;

            case 2:
                console.table(await service.listarPedidos());
                break;

            case 3:
                const idActualizar = Number(await rl.question("Id del pedido a actualizar: "));
                const clienteAct = await rl.question("Cliente: ");
                const productoAct = await rl.question("Producto: ");
                const cantidadAct = Number(await rl.question("Cantidad: "));
                const precioTotalAct = Number(await rl.question("Precio total: "));
                const estadoPedidoAct = await rl.question("Estado del pedido: ");

                await service.actualizarPedido({
                    idPedido: idActualizar,
                    cliente: clienteAct,
                    producto: productoAct,
                    cantidad: cantidadAct,
                    precioTotal: precioTotalAct,
                    estadoPedido: estadoPedidoAct.toUpperCase() as EstadoPedido
                });

                console.log("Pedido actualizado correctamente.");
                break;

            case 4:
                const idEliminar = Number(await rl.question("Id del pedido a eliminar: "));
                await service.eliminarPedido(idEliminar);
                console.log("Pedido eliminado correctamente.");
                break;

            case 5:
                const idBuscar = Number(await rl.question("Id del pedido: "));
                await service.buscarPorId(idBuscar);
                break;

            case 6:
                console.log("Saliendo al menú principal...");
                return;
        }
    }
}
