import { createServer } from "http";
import {routesUsuario } from "../router/UsuarioRouter";
import { routesProducto } from "../router/ProductoRouter";
import { routesPedido } from "../router/PedidoRouter";

const servidor = createServer(
    async(req, res) =>{
        const url = req.url ?? "";

        if(url.startsWith("/usuarios"))
        await routesUsuario(req, res);
        if (url.startsWith("/productos")) 
        await routesProducto(req, res);
        if (url.startsWith("/pedidos")) 
        await routesPedido(req, res);
        return;

    }
);

servidor.listen(3000, () =>{
    console.log("----------------------");
    console.log("Servidor iniciado en:");
    console.log("http://localhost:3000");
    console.log("----------------------");
});