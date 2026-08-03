import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../models/Usuario/Usuarios";

export class UsuarioService {
  private repository = new UsuarioRepository();

  async listarUsuarios(): Promise<Usuario[]> {
    return await this.repository.obtenerUsuarios();
  }

  async buscarPorId(id: number): Promise<Usuario> {
    const usuarios = await this.repository.obtenerUsuarios();
    const usuarioExistente = usuarios.find((u) => Number(u.id) === Number(id));

    if (!usuarioExistente) {
      throw new Error(`El usuario con ID ${id} no existe.`);
    }
    console.log("Usuario encontrado:", usuarioExistente);
    return usuarioExistente;
  }

  async agregarUsuario(usuario: Usuario): Promise<void> {
    const esDominioValido = await this.validarDominio(usuario?.correo);
    if (!esDominioValido) {
      throw new Error(
        "El correo no tiene un dominio permitido (debe ser gmail.com, outlook.com o hotmail.com).",
      );
    }

    const usuarios = await this.repository.obtenerUsuarios();
    const existe = usuarios.some((u) => Number(u.id) === Number(usuario.id));
    if (existe) {
      throw new Error(`El usuario con ID ${usuario.id} ya existe.`);
    }

    usuarios.push(usuario);
    await this.repository.guardarUsuarios(usuarios);
  }

  async actualizarUsuario(usuario: Usuario): Promise<void> {
    const esDominioValido = await this.validarDominio(usuario?.correo);
    if (!esDominioValido) {
      throw new Error(
        "El correo no tiene un dominio permitido (debe ser gmail.com, outlook.com o hotmail.com).",
      );
    }

    const usuarios = await this.repository.obtenerUsuarios();
    const indice = usuarios.findIndex(
      (u) => Number(u.id) === Number(usuario.id),
    );

    if (indice === -1) {
      throw new Error(`El usuario con ID ${usuario.id} no existe.`);
    }

    usuarios[indice] = usuario;
    await this.repository.guardarUsuarios(usuarios);
  }

  async eliminarUsuario(id: number): Promise<void> {
    const usuarios = await this.repository.obtenerUsuarios();
    const existe = usuarios.some((u) => Number(u.id) === Number(id));

    if (!existe) {
      throw new Error(`El usuario con ID ${id} no existe.`);
    }

    const usuariosFiltrados = usuarios.filter(
      (u) => Number(u.id) !== Number(id),
    );
    await this.repository.guardarUsuarios(usuariosFiltrados);
  }

  async login(
    correo: string,
    contrasena: number,
  ): Promise<Usuario | undefined> {
    return await this.repository.buscarPorCredenciales(correo, contrasena);
  }

  async validarDominio(correo?: string): Promise<boolean> {
    if (!correo || typeof correo !== "string") return false;

    const partes = correo.trim().toLowerCase().split("@");
    if (partes.length !== 2) return false;

    const dominio = partes[1];
    const dominiosPermitidos = ["gmail.com", "outlook.com", "hotmail.com"];
    return dominiosPermitidos.includes(dominio);
  }
}
