import { IncomingMessage, ServerResponse } from "http";
import { UsuarioService } from "../services/UsuarioService";
import { Usuario } from "../models/Usuario/Usuarios";

const service = new UsuarioService();

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

export async function routesUsuario(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");

  const url = req.url ?? "";
  const metodo = req.method ?? "";

  try {
    // GER | LISTAR USUARIOS
    if (metodo === "GET" && url === "/usuarios") {
      const usuarios = await service.listarUsuarios();
      res.writeHead(200);
      res.end(JSON.stringify({ usuarios }));
    }
  } catch (error) {
    res.writeHead(500);
    res.end(
      JSON.stringify({
        mensaje: (error as Error).message,
      }),
    );
  }

  // POST | AGREGAR USUARIO
  try {
    if (metodo === "POST" && url === "/usuarios/agregar") {
      const nuevoUsuario = await obtenerBody<Usuario>(req);
      await service.agregarUsuario(nuevoUsuario);
      res.writeHead(201);
      return res.end(
        JSON.stringify({
          mensaje: "Usuario agregado correctamente",
          usuario: nuevoUsuario,
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

  // PUT | ACTUALIZAR USUARIO
  if (metodo === "PUT" && url.startsWith("/usuarios/actualizar/")) {
    const id = Number(url.split("/")[3]);

    if (isNaN(id)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ mensaje: "ID no valido" }));
    }

    const body = await obtenerBody<any>(req);
    const usuarioActualizado: Usuario = {
      ...body,
      id: id,
    };
    if (!usuarioActualizado.correo) {
      res.writeHead(400);
      return res.end(
        JSON.stringify({
          mensaje: "Es obligatorio incluir la propiedad 'correo' en el body",
        }),
      );
    }

    await service.actualizarUsuario(usuarioActualizado);

    res.writeHead(200);
    return res.end(
      JSON.stringify({
        mensaje: "Usuario actualizado correctamente",
        usuario: usuarioActualizado,
      }),
    );
  }

  // DELETE | ELIMINAR USUARIO
  try {
    if (metodo === "DELETE" && url.startsWith("/usuarios/eliminar/")) {
      const id = Number(url.split("/")[3]);

      if (isNaN(id)) {
        res.writeHead(400);
        return res.end(JSON.stringify({ mensaje: "ID no válido" }));
      }

      await service.eliminarUsuario(id);

      res.writeHead(200);
      return res.end(
        JSON.stringify({ mensaje: "Usuario eliminado correctamente" }),
      );
    }
  } catch (error) {
    res.writeHead(400);
    return res.end(JSON.stringify({ mensaje: (error as Error).message }));
  }

  //BUSCAR USUARIO POR ID
  try {
    if (metodo === "GET" && url.startsWith("/usuarios/buscar/")) {
      const id = Number(url.split("/")[3]);

      if (isNaN(id)) {
        res.writeHead(400);
        return res.end(JSON.stringify({ mensaje: "ID no válido" }));
      }

      const usuario = await service.buscarPorId(id);

      res.writeHead(200);
      return res.end(JSON.stringify({ usuario }));
    }
  } catch (error) {
    res.writeHead(400);
    return res.end(JSON.stringify({ mensaje: (error as Error).message }));
  }
}
