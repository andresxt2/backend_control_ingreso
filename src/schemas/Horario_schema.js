import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

/*
CREATE TABLE Horarios (
    Horario_ID INT AUTO_INCREMENT PRIMARY KEY,
    Periodo_ID INT,
    Usuario_Cedula VARCHAR(13),
    Horario_Dia INT,
    Horario_Entrada TIME,
    Horario_Salida TIME,
    Horario_Modadlidad VARCHAR(30),
    Horario_IsDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Periodo_ID, Usuario_Cedula) REFERENCES PeriodoXUsuario(Periodo_ID, Usuario_Cedula) ON DELETE RESTRICT
);
*/


export const Horarios = sequelize.define('Horarios', {
    Horario_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UsuarioXPeriodo_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Horario_Dia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Horario_Entrada: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Horario_Salida: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Horario_Modalidad: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    Horario_IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});
