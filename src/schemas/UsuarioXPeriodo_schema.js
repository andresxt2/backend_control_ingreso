import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const UsuarioXPeriodo = sequelize.define('UsuarioXPeriodo', {
    UsuarioXPeriodo_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Periodo_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Usuario_Cedula: {
        type: DataTypes.STRING(13),
        allowNull: false
    },
    UsuarioXPeriodo_IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

