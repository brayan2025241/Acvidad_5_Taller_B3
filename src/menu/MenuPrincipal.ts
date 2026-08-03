import { Estado } from "../enums/Estado";
import { Rol } from "../enums/Rol";
import { Usuario } from "../models/Usuario/Usuarios";
import { UsuarioService } from "../services/UsuarioService";
import { rl } from "../utils/Readline";
import { MenuProductos} from "./MenuProductos";
import { MenuPedidos } from "./MenuPedidos";


const service = new UsuarioService();

export async function iniciarSesion() {
    while (true) {
        console.log("|||||| Inicio de Sesión ||||||");
        const correo = await rl.question("Correo: ");
        const contrasena = Number(await rl.question("Contraseña: "));
        const usuarioLogueado = await service.login(correo, contrasena);

        if (usuarioLogueado) {
            console.log(`\n¡Bienvenido/a, ${usuarioLogueado.nombre}!`);
            await menuPrincipal();
            break;
        } else {
            console.log("Credenciales incorrectas. Inténtelo de nuevo.\n");
        }
    }
}

export async function menuPrincipal() {
    let opcion = 0;

    while (true) {
        console.log("                  ");
        console.log("||||||||||||||||||");
        console.log("||MENU PRINCIPAL||");
        console.log("||||||||||||||||||");
        console.log("                  ");
        console.log("  USUARIOS  ");
        console.log("\n1. Agregar");
        console.log("2. Listar");
        console.log("3. Actualizar");
        console.log("4. Eliminar");
        console.log("5. Buscar por id");
        console.log("6. Menu de Productos");
        console.log("7. Menu de Pedidos");
        console.log("8. Salir");
        
        opcion = Number(await rl.question("-OPCION: "));

        switch (opcion) {
            case 1:
                const id = Number(await rl.question("Id: "));
                const nombre = await rl.question("Nombre: ");
                const apellido = await rl.question("Apellido: ");
                const edad = Number(await rl.question("Edad: "));
                const correo = await rl.question("Correo: ");
                const contrasena = Number(await rl.question("Contraseña: "));
                const rolTexto = await rl.question("Rol: ");
                const estadoTexto = await rl.question("Estado: ");

                await service.agregarUsuario({
                    id,
                    nombre,
                    apellido,
                    edad,
                    correo,
                    contrasena,
                    rol: rolTexto.toUpperCase() as Rol,
                    estado: estadoTexto.toUpperCase() as Estado
                });

                break;

            case 2:
                console.table(await service.listarUsuarios());
                break;
            case 3:
                const idActualizar = Number(await rl.question("Id del usuario a actualizar: "));
                const nombreAct = await rl.question("Nombre: ");
                const apellidoAct = await rl.question("Apellido: ");
                const edadAct = Number(await rl.question("Edad: "));
                const correoAct = await rl.question("Correo: ");
                const contrasenaAct = Number(await rl.question("Contraseña: "));
                const rolTextoAct = await rl.question("Rol: ");
                const estadoTextoAct = await rl.question("Estado: ");

                const usuarioActualizado: Usuario = {
                    id: idActualizar,
                    nombre: nombreAct,
                    apellido: apellidoAct,
                    edad: edadAct,
                    correo: correoAct,
                    contrasena: contrasenaAct,
                    rol: rolTextoAct.toUpperCase() as Rol,
                    estado: estadoTextoAct.toUpperCase() as Estado
                };
                await service.actualizarUsuario(usuarioActualizado);
                break;

            case 4:
                const idEliminar = Number(await rl.question("Id del usuario a eliminar: "));
                await service.eliminarUsuario(idEliminar);
                break;
            case 5:
                const idBuscar = Number(await rl.question("Id del usuario: "));
                await service.buscarPorId(idBuscar);
                break;
            case 6:
                await MenuProductos();
                break;
            case 7:
                await MenuPedidos();
                break;
            case 8:
                console.log("saliendo...");
                console.log("|||||||||||GRACIAS POR VISITAR|||||||||||");
                rl.close();
                return;
        }

    }

}