// const { config } = require("dotenv");
const dbConfig = require("./config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`);
// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = sequelize;