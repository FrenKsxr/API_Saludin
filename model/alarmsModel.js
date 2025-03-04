const { DataTypes, INTEGER } = require('sequelize')
const sequelize = require ('../db/database');


const alarm = sequelize.define('alarms',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    active:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    frecuencia:{
        type:DataTypes.INTEGER,
        allowNull: false
    }, 
    cantidad:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    dias:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    fecha_inicio:{
        type:DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'alarms',
    timestamps: false
}
);

module.exports = alarm