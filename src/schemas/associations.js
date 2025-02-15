import { Usuario } from "./Usuario_schema.js";
import { Periodo } from "./Periodo_schema.js";
import { UsuarioXPeriodo } from "./UsuarioXPeriodo_schema.js";
import { Resumen_Horas_Estudiantes } from "./Resumen_Horas_Estudiantes_schema.js";
import { Horas_Extraordinarias } from "./Horas_Extraordinarias_schema.js";
import { Seguimiento_Semanal } from "./Seguimiento_Semanal_schema.js";
import { Horarios } from "./Horario_schema.js";

/* 🔹 Relación N:M entre Usuario y Periodo a través de UsuarioXPeriodo */
Usuario.belongsToMany(Periodo, { 
    through: UsuarioXPeriodo, 
    foreignKey: "Usuario_Cedula" 
});

Periodo.belongsToMany(Usuario, { 
    through: UsuarioXPeriodo, 
    foreignKey: "Periodo_ID" 
});

/* 🔹 Relación 1:N entre Usuario y Resumen_Horas_Estudiantes */
Usuario.hasMany(Resumen_Horas_Estudiantes, { 
    foreignKey: "Usuario_Cedula" 
});

Resumen_Horas_Estudiantes.belongsTo(Usuario, { 
    foreignKey: "Usuario_Cedula" 
});

/* 🔹 Relación 1:N entre Usuario y Horas_Extraordinarias */
Usuario.hasMany(Horas_Extraordinarias, { 
    foreignKey: "Usuario_Cedula" 
});

Horas_Extraordinarias.belongsTo(Usuario, { 
    foreignKey: "Usuario_Cedula" 
});

/*Relacion 1 N entre Periodo y Seguimiento_Semanal*/
Periodo.hasMany(Seguimiento_Semanal, {
    foreignKey: "Periodo_ID"
});

Seguimiento_Semanal.belongsTo(Periodo, {
    foreignKey: "Periodo_ID"
});

/* 🔹 Un `UsuarioXPeriodo` puede tener muchos `Horarios` */
UsuarioXPeriodo.hasMany(Horarios, { foreignKey: "UsuarioXPeriodo_ID" });

/* 🔹 Un `Horario` pertenece a un `UsuarioXPeriodo` */
Horarios.belongsTo(UsuarioXPeriodo, { 
    foreignKey: "UsuarioXPeriodo_ID",
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


console.log("📌 Relaciones de Sequelize establecidas correctamente.");
