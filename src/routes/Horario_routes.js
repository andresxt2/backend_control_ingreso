import { HorarioController } from "../controllers/Horario_Controller.js";

import { Router } from "express";

export const HorarioRouter = Router();

HorarioRouter.get('/horario', HorarioController.getHorarios);
HorarioRouter.get('/horario/:id', HorarioController.getById);
HorarioRouter.post('/horario', HorarioController.createHorario);
HorarioRouter.put('/horario/:id', HorarioController.update);
HorarioRouter.delete('/horario/:id', HorarioController.delete);
