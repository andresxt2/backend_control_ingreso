import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

import {Resumen_Horas_Estudiantes} from './Resumen_Horas_Estudiantes_schema.js';
import { Horas_Extraordinarias } from './Horas_Extraordinarias_schema.js';
import { Periodo } from "./Periodo_schema.js";
import { UsuarioXPeriodo } from "./UsuarioXPeriodo_schema.js";
/*
CREATE TABLE Usuario (
    Usuario_Cedula VARCHAR(13) PRIMARY KEY,
    Usuario_Nombres VARCHAR(200),
    Usuario_Apellidos VARCHAR(200),
    Usuario_Area VARCHAR(100),
    Usuario_Correo VARCHAR(50),
    Usuario_Huella VARBINARY(500),
    Usuario_contrasenia VARCHAR(64),
    Usuario_Activo BOOLEAN DEFAULT TRUE,
    Usuario_Tipo VARCHAR(60),
    Usuario_IsDeleted BOOLEAN DEFAULT FALSE
);
 */

export const Usuario = sequelize.define('Usuario', {
    Usuario_Cedula: {
        type: DataTypes.STRING(13),
        primaryKey: true
    },
    Usuario_Nombres: {
        type: DataTypes.STRING(200)
    },
    Usuario_Apellidos: {
        type: DataTypes.STRING(200)
    },
    Usuario_Area: {
        type: DataTypes.STRING(100)
    },
    Usuario_Correo: {
        type: DataTypes.STRING(50)
    },
    Usuario_Huella: {
        type: DataTypes.BLOB
    },
    Usuario_contrasenia: {
        type: DataTypes.STRING(64)
    },
    Usuario_Activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    Usuario_Tipo: {
        type: DataTypes.STRING(60)
    },
    Usuario_IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});
/*
Usuario.hasMany(Resumen_Horas_Estudiantes, {foreignKey: 'Usuario_Cedula', sourceKey: 'Usuario_Cedula'});
Resumen_Horas_Estudiantes.belongsTo(Usuario, {foreignKey: 'Usuario_Cedula', sourceKey: 'Usuario_Cedula'});

Usuario.hasMany(Horas_Extraordinarias, {foreignKey: 'Usuario_Cedula', sourceKey: 'Usuario_Cedula'});
Horas_Extraordinarias.belongsTo(Usuario, {foreignKey: 'Usuario_Cedula', sourceKey: 'Usuario_Cedula'});
*/
// Relación N:M con Periodo a través de UsuarioXPeriodo
//Usuario.belongsToMany(Periodo, { through: UsuarioXPeriodo, foreignKey: 'Usuario_Cedula' });