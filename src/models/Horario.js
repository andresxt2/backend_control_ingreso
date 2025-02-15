import { Horarios } from "../schemas/Horario_schema.js";

export class HorarioModel {
    static async getHorarios() {
        try {
            return await Horarios.findAll({ where: { Horario_IsDeleted: false } });
        } catch (error) {
            throw new Error(`Error al obtener horarios: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            return await Horarios.findOne({
                where: { Horario_ID: id, Horario_IsDeleted: false }
            });
        } catch (error) {
            throw new Error(`Error al obtener horario: ${error.message}`);
        }
    }

    static async create(data) {
        try {
            return await Horarios.create(data);
        } catch (error) {
            throw new Error(`Error al crear horario: ${error.message}`);
        }
    }

    static async update(id, data) {
        try {
            const horario = await this.getById(id);

            if (!horario) return null;

            const [rowsUpdated] = await Horarios.update(data, {
                where: { Horario_ID: id, Horario_IsDeleted: false }
            });

            if (rowsUpdated === 0) return null;
            return await this.getById(id);
        } catch (error) {
            throw new Error(`Error al actualizar horario: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const horario = await this.getById(id);

            if (!horario) return null;

            await Horarios.update(
                { Horario_IsDeleted: true },
                { where: { Horario_ID: id, Horario_IsDeleted: false } }
            );
            return horario;
        } catch (error) {
            throw new Error(`Error al eliminar horario: ${error.message}`);
        }
    }

    //TODO: Add extra method for next functions depending of mockups and UsuarioXPeriodo
}