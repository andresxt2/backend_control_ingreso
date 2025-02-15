import { UsuarioController } from "../controllers/UsuarioController.js";
import { Router } from "express";

export const UsuariosRouter = Router();

UsuariosRouter.get('/usuarios', UsuarioController.getUsuarios);
UsuariosRouter.get('/usuarios/:id', UsuarioController.getById);
UsuariosRouter.post('/usuarios', UsuarioController.createUsuario);
UsuariosRouter.put('/usuarios/:cedula', UsuarioController.update);
UsuariosRouter.delete('/usuarios/:cedula', UsuarioController.delete);

