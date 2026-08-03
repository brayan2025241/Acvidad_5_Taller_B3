import { readFile, writeFile } from "fs/promises";
import { Usuario } from "../models/Usuario/Usuarios";


export class UsuarioRepository {
    //DAR LA RUTA DE DONDE SE ALMACENA 
    private ruta = "./usuarios.json";
    //METODO PARA OBTENER USUARIOS O MOSTRAR DATOS
    async obtenerUsuarios(): Promise<Usuario[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.log("Error al obtener usuarios:", error);
            return [];
        }
    }

    //METODO PARA GUARDAR USUARIOS O CREAR DATOS
    async guardarUsuarios(usuarios: Usuario[]): Promise<void> {
        try {
            await writeFile(this.ruta, JSON.stringify(usuarios, null, 4));
        } catch (error) {
            console.log("Error al guardar usuarios:", error);
        }
    }

    //METODO PARA ELIMINAR AL USUARIO
    async eliminarUsuarios(id: number): Promise<void> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            datos.id;
            return JSON.parse(datos.id);
        } catch (error) {
            console.log("Error al eliminar usuarios:", error);
        }
    }

    //LOGIN
    async buscarPorCredenciales(correo: string, contrasena: number): Promise<Usuario | undefined> {
        const usuarios = await this.obtenerUsuarios();
        return usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
    }

}