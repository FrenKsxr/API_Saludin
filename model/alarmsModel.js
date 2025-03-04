const { DataTypes, INTEGER } = require('sequelize')
const sequelize = require ('../db/database');


const alarm = sequelize.define('alarms',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    hour:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    minute:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    active:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'alarms',
    timestamps: false
}
);

module.exports = alarm