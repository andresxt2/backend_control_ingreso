import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

/*
CREATE TABLE Resumen_Horas_Estudiantes (
    Resumen_ID INT AUTO_INCREMENT PRIMARY KEY,
    Usuario_Cedula VARCHAR(13),
    Resumen_Inicio DATE,
    Resumen_Fin DATE,
    Resumen_Horas_Adicionales DECIMAL(5,2),
    Resumen_Horas_Reducidas DECIMAL(5,2),
    Resumen_Horas_Totales DECIMAL(5,2),
    Resumen_IsDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Usuario_Cedula) REFERENCES Usuario(Usuario_Cedula) ON DELETE RESTRICT
);
*/

export const Resumen_Horas_Estudiantes = sequelize.define('Resumen_Horas_Estudiantes', {
    Resumen_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Resumen_Inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Resumen_Fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Resumen_Horas_Adicionales: {
        type: DataTypes.DECIMAL(5,2)
    },
    Resumen_Horas_Reducidas: {
        type: DataTypes.DECIMAL(5,2)
    },
    Resumen_Horas_Totales: {
        type: DataTypes.DECIMAL(5,2)
    },
    Resumen_IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    } 
});


