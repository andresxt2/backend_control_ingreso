import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'seguimiento_horas', 
    'user_control', 
    'ltic', 
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: 'America/Guayaquil' // Para Ecuador (Guayaquil, Quito, etc.)
    }
);