const db = require ('sequelize')

const sequelize = new db (
    process.env.db_name,
    process.env.db_user,
    process.env.db_password,
    {
        host: process.env.db_host,
        dialect: 'mysql'
    }
);

module.exports = sequelize

