const { Sequelize } = require('sequelize');

//const sequelizeConfig = 'sqlite::memory:';
const sequelizeConfig = {dialect: "sqlite", storage: "database.sqlite"};
//const sequelize = new Sequelize(sequelizeConfig, {query:{raw:true}});
const sequelize = new Sequelize(sequelizeConfig);


class Db {

  async init() {
    this["Link"] = require("./Link")(sequelize);
    this["LinkClick"] = require("./LinkClick")(sequelize);
    const result = await sequelize.sync();
  }

}


module.exports = new Db()

