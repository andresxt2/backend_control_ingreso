import { UsuarioXPeriodo } from "../schemas/UsuarioXPeriodo_schema.js";

export class UsuarioXPeriodoModel {
    /** 🔹 Obtener todos los registros activos */
    static async getUsuarioXPeriodos() {
        try {
            return await UsuarioXPeriodo.findAll({
                where: { UsuarioXPeriodo_IsDeleted: false }
            });
        } catch (error) {
            throw new Error(`Error al obtener usuarioXPeriodo: ${error.message}`);
        }
    }

    /** 🔹 Obtener un registro por clave primaria compuesta, solo si no está eliminado */
    static async getById(periodoId, usuarioCedula) {
        try {
            return await UsuarioXPeriodo.findOne({
                where: { Periodo_ID: periodoId, Usuario_Cedula: usuarioCedula, UsuarioXPeriodo_IsDeleted: false }
            });
        } catch (error) {
            throw new Error(`Error al obtener usuarioXPeriodo: ${error.message}`);
        }
    }

    /** 🔹 Crear un nuevo registro */
    static async create(data) {
        try {
            return await UsuarioXPeriodo.create(data);
        } catch (error) {
            throw new Error(`Error al crear usuarioXPeriodo: ${error.message}`);
        }
    }

    /** 🔹 Actualizar un registro usando ambas claves (reutilizando getById) */
    static async update(periodoId, usuarioCedula, data) {
        try {
            const usuarioXPeriodo = await this.getById(periodoId, usuarioCedula); // ✅ Reutiliza getById

            if (!usuarioXPeriodo) return null; // 🔹 Si no existe o está eliminado

            const [rowsUpdated] = await UsuarioXPeriodo.update(data, {
                where: { Periodo_ID: periodoId, Usuario_Cedula: usuarioCedula, UsuarioXPeriodo_IsDeleted: false }
            });

            if (rowsUpdated === 0) return null; // 🔹 No se actualizó ningún registro

            // 🔹 Si la clave primaria cambió, buscar con los nuevos valores
            const newPeriodoId = data.Periodo_ID || periodoId;
            const newUsuarioCedula = data.Usuario_Cedula || usuarioCedula;

            return await this.getById(newPeriodoId, newUsuarioCedula); // ✅ Buscar con los valores actualizados
        } catch (error) {
            throw new Error(`Error al actualizar usuarioXPeriodo: ${error.message}`);
        }
    }

    /** 🔹 Eliminar (marcado lógico) usando ambas claves (reutilizando getById) */
    static async delete(periodoId, usuarioCedula) {
        try {
            const usuarioXPeriodo = await this.getById(periodoId, usuarioCedula); // ✅ Reutiliza getById

            if (!usuarioXPeriodo) return null; // 🔹 Si el registro no existe o ya está eliminado

            await UsuarioXPeriodo.update(
                { UsuarioXPeriodo_IsDeleted: true },
                { where: { Periodo_ID: periodoId, Usuario_Cedula: usuarioCedula, UsuarioXPeriodo_IsDeleted: false } } // ✅ Solo si no está eliminado ya
            );

            return await UsuarioXPeriodo.findOne({ where: { Periodo_ID: periodoId, Usuario_Cedula: usuarioCedula } }); // Retorna el registro actualizado
        } catch (error) {
            throw new Error(`Error al eliminar usuarioXPeriodo: ${error.message}`);
        }
    }
}
