import { HorarioModel } from "../models/Horario.js";

export class HorarioController {
    static async getHorarios(req, res) {
        try {
            const horarios = await HorarioModel.getHorarios();
            res.json(horarios);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const horario = await HorarioModel.getById(id);
            if (horario) return res.json(horario)
            res.status(404).json({ message: "Horario no encontrado" });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Crear un nuevo horario
    static async createHorario(req, res) {
        try {
            const newHorario = await HorarioModel.create(req.body);
            return res.status(201).json(newHorario);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const updatedHorario = await HorarioModel.update(id, req.body);

            if (!updatedHorario) return res.status(404).json({ message: "Horario no encontrado" });

            return res.json(updatedHorario);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedHorario = await HorarioModel.delete(id);

            if (!deletedHorario) return res.status(404).json({ message: "Horario no encontrado" });
            return res.json({ message: "Horario eliminado lógicamente", horario: deletedHorario });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

  /*  static async getHorariosByUser(req, res) {
        try {
            const horarios = await HorarioModel.getHorariosByUser(req.params.id);
            res.json(horarios);
        } catch (error) {
            res.status(500).json(error);
        }
    }*/
}