import { UsuarioXPeriodoController } from "../controllers/UsuarioXPeriodo_Controller.js";
import { Router } from "express";

export const UsuarioXPeriodoRouter = Router();

// 🔹 Obtener todos los registros
UsuarioXPeriodoRouter.get('/usuarioXPeriodo', UsuarioXPeriodoController.getUsuarioXPeriodos);

// 🔹 Obtener un registro por clave primaria compuesta (Periodo_ID y Usuario_Cedula)
UsuarioXPeriodoRouter.get('/usuarioXPeriodo/:periodoId/:usuarioCedula', UsuarioXPeriodoController.getById);

// 🔹 Crear un nuevo registro
UsuarioXPeriodoRouter.post('/usuarioXPeriodo', UsuarioXPeriodoController.create);

// 🔹 Actualizar un registro por clave primaria compuesta
UsuarioXPeriodoRouter.put('/usuarioXPeriodo/:periodoId/:usuarioCedula', UsuarioXPeriodoController.update);

// 🔹 Eliminar (marcar como eliminado) un registro por clave primaria compuesta
UsuarioXPeriodoRouter.delete('/usuarioXPeriodo/:periodoId/:usuarioCedula', UsuarioXPeriodoController.delete);
