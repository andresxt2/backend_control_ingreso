import { Usuario } from "../schemas/Usuario_schema.js";

export class UsuarioModel {
    
    /** 🔹 Obtener todos los usuarios activos */
    static async getUsuarios() {
        try {
            return await Usuario.findAll({ where: { Usuario_IsDeleted: false } });
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    /** 🔹 Obtener un usuario por ID, solo si no está eliminado */
    static async getById(id) {
        try {
            return await Usuario.findOne({
                where: { Usuario_Cedula: id, Usuario_IsDeleted: false } // ✅ Filtro de eliminado
            });
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    /** 🔹 Crear un nuevo usuario */
/** 🔹 Crear un nuevo usuario */
static async create(data) {
    try {
        // Asegurar que `data` sea siempre un array
        const usuarios = Array.isArray(data) ? data : [data];
        return await Usuario.bulkCreate(usuarios);
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error.message}`);
    }
}


    /** 🔹 Actualizar usuario solo si no está eliminado (reutilizando getById) */
    static async update(cedula, data) {
        try {
            const usuario = await this.getById(cedula); // ✅ Reutiliza getById para verificar si el usuario existe

            if (!usuario) return null; // 🔹 Si el usuario no existe o está eliminado

            const [rowsUpdated] = await Usuario.update(data, {
                where: { Usuario_Cedula: cedula, Usuario_IsDeleted: false } // ✅ Aplica el filtro en la actualización
            });

            if (rowsUpdated === 0) return null; // 🔹 Si no se actualizó nada
            return await this.getById(cedula); // ✅ Retorna el usuario actualizado
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

     /** 🔹 Actualizar la huella del usuario */
     static async updateHuella(cedula, huellaBase64) {
        try {
            const usuario = await this.getById(cedula);
            if (!usuario) return null; // 🔹 Usuario no encontrado

            // 🔹 Convertir la huella de Base64 a Buffer (BLOB)
            const huellaBuffer = Buffer.from(huellaBase64, "base64");

            // 🔹 Actualizar la huella en la base de datos
            const [rowsUpdated] = await Usuario.update(
                { Usuario_Huella: huellaBuffer },
                { where: { Usuario_Cedula: cedula, Usuario_IsDeleted: false } }
            );

            if (rowsUpdated === 0) return null; // 🔹 Si no se actualizó nada
            return await this.getById(cedula); // ✅ Retorna el usuario actualizado
        } catch (error) {
            throw new Error(`Error al actualizar huella: ${error.message}`);
        }
    }

    /** 🔹 Obtener la huella de un usuario */
    static async getHuella(cedula) {
        try {
            const usuario = await this.getById(cedula);
            if (!usuario || !usuario.Usuario_Huella) return null; // 🔹 Si no hay huella

            // 🔹 Convertir la huella de Buffer a Base64 para enviarla al frontend
            return usuario.Usuario_Huella.toString("base64");
        } catch (error) {
            throw new Error(`Error al obtener la huella: ${error.message}`);
        }
    }

    /** 🔹 Eliminar usuario (marcado lógico) solo si no está eliminado (reutilizando getById) */
    static async delete(cedula) {
        try {
            const usuario = await this.getById(cedula); // ✅ Reutiliza getById para verificar si el usuario existe

            if (!usuario) return null; // 🔹 Si el usuario no existe o ya está eliminado

            await Usuario.update(
                { Usuario_IsDeleted: true }, // 🔹 Marcar como eliminado
                { where: { Usuario_Cedula: cedula, Usuario_IsDeleted: false } } // ✅ Solo si no está eliminado ya
            );

            return await Usuario.findOne({ where: { Usuario_Cedula: cedula } }); // Retorna el usuario actualizado
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
}
