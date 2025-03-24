import { Registro_Asistencia_Controller } from "../controllers/Registro_Asistencia_Controller";
import { Router } from "express";

const router = Router();

router.get("/registros", Registro_Asistencia_Controller.getRegistros);
router.get("/registros/:id", Registro_Asistencia_Controller.getById);
// Nueva ruta para obtener el registro abierto (se enviará usuarioXPeriodoId y opcionalmente fecha en query)
router.get("/registros/abierto", Registro_Asistencia_Controller.getRegistroAbierto);
router.post("/registros", Registro_Asistencia_Controller.create);
router.put("/registros/:id", Registro_Asistencia_Controller.update);
router.delete("/registros/:id", Registro_Asistencia_Controller.delete);
