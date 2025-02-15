import { Horas_Extraordinarias } from "../schemas/Horas_Extraordinarias_schema.js";

export class Horas_ExtraordinariasModel {

    /** 🔹 Obtener todas las horas extraordinarias activas */
    static async getHoras_Extraordinarias() {
        try {
            return await Horas_Extraordinarias.findAll({
                where: { Horas_IsDeleted: false }
            });
        } catch (error) {
            throw new Error(`Error al obtener horas extraordinarias: ${error.message}`);
        }
    }

    /** 🔹 Obtener una hora extraordinaria por ID, solo si no está eliminada */
    static async getById(id) {
        try {
            return await Horas_Extraordinarias.findOne({
                where: { Horas_ID: id, Horas_IsDeleted: false } // ✅ Filtro de eliminación lógica
            });
        } catch (error) {
            throw new Error(`Error al obtener horas extraordinarias: ${error.message}`);
        }
    }

    /** 🔹 Crear un nuevo registro */
    static async create(data) {
        try {
            return await Horas_Extraordinarias.create(data);
        } catch (error) {
            throw new Error(`Error al crear horas extraordinarias: ${error.message}`);
        }
    }

    /** 🔹 Actualizar un registro solo si no está eliminado (reutilizando getById) */
    static async update(id, data) {
        try {
            const horasExtraordinarias = await this.getById(id); // ✅ Reutiliza getById

            if (!horasExtraordinarias) return null; // 🔹 Si no existe o está eliminado

            const [rowsUpdated] = await Horas_Extraordinarias.update(data, {
                where: { Horas_ID: id, Horas_IsDeleted: false } // ✅ Filtro en la actualización
            });

            if (rowsUpdated === 0) return null; // 🔹 Si no se actualizó nada
            return await this.getById(id); // ✅ Retorna el registro actualizado
        } catch (error) {
            throw new Error(`Error al actualizar horas extraordinarias: ${error.message}`);
        }
    }

    /** 🔹 Eliminar (marcar como eliminado) solo si no está eliminado (reutilizando getById) */
    static async delete(id) {
        try {
            const horasExtraordinarias = await this.getById(id); // ✅ Reutiliza getById

            if (!horasExtraordinarias) return null; // 🔹 Si no existe o ya está eliminado

            await Horas_Extraordinarias.update(
                { Horas_IsDeleted: true }, // 🔹 Marcar como eliminado
                { where: { Horas_ID: id, Horas_IsDeleted: false } } // ✅ Solo si aún no está eliminado
            );

            return await Horas_Extraordinarias.findOne({ where: { Horas_ID: id } }); // Retorna el registro actualizado
        } catch (error) {
            throw new Error(`Error al eliminar horas extraordinarias: ${error.message}`);
        }
    }

    /** 🔹 Obtener todas las horas extraordinarias de un usuario */
    static async getHoras_ExtraordinariasByUser(id) {
        try {
            return await Horas_Extraordinarias.findAll({
                where: { Usuario_Cedula: id, Horas_IsDeleted: false }
            });
        } catch (error) {
            throw new Error(`Error al obtener horas extraordinarias por usuario: ${error.message}`);
        }
    }
}
