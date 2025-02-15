import { Resumen_Horas_EstudiantesModel } from "../models/Resumen_Horas_Estudiantes.js";

export class resumenHorasController {
    static async getResumen_Horas_Estudiantes(req, res) {
        try {
            const resumenHorasEstudiantes = await Resumen_Horas_EstudiantesModel.getResumen_Horas_Estudiantes();
            res.json(resumenHorasEstudiantes);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const resumenHorasEstudiantes = await Resumen_Horas_EstudiantesModel.getById(id);
            if (resumenHorasEstudiantes) return res.json(resumenHorasEstudiantes)
            res.status(404).json({ message: "Resumen de horas no encontrado" });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Crear un nuevo resumen de horas
    static async createResumen_Horas_Estudiantes(req, res) {
        try {
            const newResumenHoras = await Resumen_Horas_EstudiantesModel.create(req.body);
            return res.status(201).json(newResumenHoras);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const updatedResumenHoras = await Resumen_Horas_EstudiantesModel.update(id, req.body);

            if (!updatedResumenHoras) return res.status(404).json({ message: "Resumen de horas no encontrado" });

            return res.json(updatedResumenHoras);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedResumenHoras = await Resumen_Horas_EstudiantesModel.delete(id);

            if (!deletedResumenHoras) return res.status(404).json({ message: "Resumen de horas no encontrado" });
            return res.json({ message: "Resumen de horas eliminado lógicamente", resumenHoras: deletedResumenHoras });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getResumen_Horas_EstudiantesByUser(req, res) {
        try {
            const resumenHorasEstudiantes = await Resumen_Horas_EstudiantesModel.getResumen_Horas_EstudiantesByUser(req.params.id);
            res.json(resumenHorasEstudiantes);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}