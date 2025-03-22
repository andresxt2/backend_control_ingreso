import { UsuarioController } from "../controllers/UsuarioController.js";
import { Router } from "express";

export const UsuariosRouter = Router();


//http://localhost:3000/usuarios

UsuariosRouter.get('/usuarios', UsuarioController.getUsuarios);
// 🔹 Rutas para manejo de huellas digitales
UsuariosRouter.put('/usuarios/actualizar-huella', UsuarioController.actualizarHuella);
UsuariosRouter.get('/usuarios/obtener-huella/:usuarioCedula', UsuarioController.obtenerHuella);
UsuariosRouter.get('/usuarios/:id', UsuarioController.getById);
UsuariosRouter.post('/usuarios', UsuarioController.createUsuario);
UsuariosRouter.put('/usuarios/:cedula', UsuarioController.update);
UsuariosRouter.delete('/usuarios/:cedula', UsuarioController.delete);

