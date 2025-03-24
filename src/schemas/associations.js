import { Usuario } from "./Usuario_schema.js";
import { Periodo } from "./Periodo_schema.js";
import { UsuarioXPeriodo } from "./UsuarioXPeriodo_schema.js";
import { Resumen_Horas_Estudiantes } from "./Resumen_Horas_Estudiantes_schema.js";
import { Horas_Extraordinarias } from "./Horas_Extraordinarias_schema.js";
import { Seguimiento_Semanal } from "./Seguimiento_Semanal_schema.js";
import { Horarios } from "./Horario_schema.js";
import { Registro_Asistencia } from "./Registro_Asistencia_Schema.js";

/* 🔹 Relación N:M entre Usuario y Periodo a través de UsuarioXPeriodo */
Usuario.belongsToMany(Periodo, { 
    through: UsuarioXPeriodo, 
    foreignKey: "Usuario_Cedula",
    as: "periodos"  // 📌 Alias para consultas más claras
});

Periodo.belongsToMany(Usuario, { 
    through: UsuarioXPeriodo, 
    foreignKey: "Periodo_ID",
    as: "usuarios"  // 📌 Alias para consultas más claras
});

/* 🔹 Relación 1:N entre Usuario y UsuarioXPeriodo (para `include` correcto) */
Usuario.hasMany(UsuarioXPeriodo, { 
    foreignKey: "Usuario_Cedula",
    as: "usuarioPeriodos"  // 📌 Alias para hacer consultas desde UsuarioXPeriodo
});

UsuarioXPeriodo.belongsTo(Usuario, { 
    foreignKey: "Usuario_Cedula",
    as: "usuario"  // 📌 Alias para hacer consultas desde UsuarioXPeriodo
});

/* 🔹 Relación 1:N entre Periodo y UsuarioXPeriodo (para `include` correcto) */
Periodo.hasMany(UsuarioXPeriodo, { 
    foreignKey: "Periodo_ID",
    as: "periodoUsuarios"  // 📌 Alias para hacer consultas desde UsuarioXPeriodo
});

UsuarioXPeriodo.belongsTo(Periodo, { 
    foreignKey: "Periodo_ID",
    as: "periodo"  // 📌 Alias para hacer consultas desde UsuarioXPeriodo
});

/* 🔹 Relación 1:N entre Usuario y Resumen_Horas_Estudiantes */
Usuario.hasMany(Resumen_Horas_Estudiantes, { 
    foreignKey: "Usuario_Cedula",
    as: "resumenHoras"
});

Resumen_Horas_Estudiantes.belongsTo(Usuario, { 
    foreignKey: "Usuario_Cedula",
    as: "usuarioResumen"
});

/* 🔹 Relación 1:N entre Usuario y Horas_Extraordinarias */
Usuario.hasMany(Horas_Extraordinarias, { 
    foreignKey: "Usuario_Cedula",
    as: "horasExtraordinarias"
});

Horas_Extraordinarias.belongsTo(Usuario, { 
    foreignKey: "Usuario_Cedula",
    as: "usuarioHorasExtra"
});

/* 🔹 Relación 1:N entre Periodo y Seguimiento_Semanal */
Periodo.hasMany(Seguimiento_Semanal, {
    foreignKey: "Periodo_ID",
    as: "seguimientos"
});

Seguimiento_Semanal.belongsTo(Periodo, {
    foreignKey: "Periodo_ID",
    as: "periodoSeguimiento"
});

/* 🔹 Un `UsuarioXPeriodo` puede tener muchos `Horarios` */
UsuarioXPeriodo.hasMany(Horarios, { 
    foreignKey: "UsuarioXPeriodo_ID",
    as: "horarios"
});

/* 🔹 Un `Horario` pertenece a un `UsuarioXPeriodo` */
Horarios.belongsTo(UsuarioXPeriodo, { 
    foreignKey: "UsuarioXPeriodo_ID",
    as: "usuarioXPeriodo",
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

/* 🔹 Un `UsuarioXPeriodo` puede tener muchos `Registros_Asistencia` */
UsuarioXPeriodo.hasMany(Registro_Asistencia, { 
    foreignKey: "UsuarioXPeriodo_ID",
    as: "registrosAsistencia"
});

/* 🔹 Un `Registro_Asistencia` pertenece a un `UsuarioXPeriodo` */
Registro_Asistencia.belongsTo(UsuarioXPeriodo, { 
    foreignKey: "UsuarioXPeriodo_ID",
    as: "usuarioXPeriodo",
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


console.log("📌 Relaciones de Sequelize establecidas correctamente.");
