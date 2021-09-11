const { Sequelize } = require('sequelize');

//const sequelizeConfig = 'sqlite::memory:';
//const sequelizeConfig = {dialect: "sqlite", storage: "database.sqlite"};
const sequelizeConfig = {
  dialect: "mysql",
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD
};
console.log("sequelizeConfig", sequelizeConfig);
const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, sequelizeConfig);
//const sequelize = new Sequelize(sequelizeConfig);


class Db {

  async init() {


    this["Link"] = require("./Link")(sequelize);
    this["LinkClick"] = require("./LinkClick")(sequelize);
    //const createDbQuery = `CREATE DATABASE IF NOT EXISTS \`${sequelizeConfig.database}\`;`;
    //console.log({createDbQuery});
    //await sequelize.query(createDbQuery);
    await sequelize.sync();
  }

}


module.exports = new Db()

