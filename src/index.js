import app from "./app.js";
import { sequelize } from "./database/database.js";

import { Usuario } from "./schemas/Usuario_schema.js";
import { Periodo } from "./schemas/Periodo_schema.js";
import { UsuarioXPeriodo } from "./schemas/UsuarioXPeriodo_schema.js";
import { Resumen_Horas_Estudiantes } from "./schemas/Resumen_Horas_Estudiantes_schema.js";
import { Horas_Extraordinarias } from "./schemas/Horas_Extraordinarias_schema.js";
import { Seguimiento_Semanal } from "./schemas/Seguimiento_Semanal_schema.js";
import { Horarios } from "./schemas/Horario_schema.js";
import { Alerta } from "./schemas/Alerta_schema.js";

// 🔹 Importa el archivo de asociaciones después de los modelos
import "./schemas/associations.js";

async function main(){
   try {
      await sequelize.sync();
      app.listen(3000, () => {
         console.log("Server running on port 3000")
      })
   } catch (error) {
      console.error("Error starting server: ", error)
   }
}

main()